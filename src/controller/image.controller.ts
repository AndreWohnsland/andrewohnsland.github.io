import { Request, Response, NextFunction } from 'express';
import { UploadedFile } from 'express-fileupload';
import Image from '../models/imageDB.model';
import { AppError } from '../middlewares/errorHandler';
import {
  resizeImage,
  bufferToStream,
  postPictureToDropbox,
  generateShareableLink,
  deletePictureFromDropbox,
} from './imageUtils';
import { IImageModel } from '../interfaces/image.interface';
import logger from '../setUp/initLogger';

async function addImage(req: Request, res: Response, next: NextFunction) {
  const { name, category } = req.body;
  const reqFile = req.files;
  if (reqFile === undefined || reqFile === null) return next(new AppError('No file given', 400));
  const receivedFile = reqFile.file as UploadedFile;

  const sameName = await Image.findOne({ name });
  if (sameName !== null) return next(new AppError('Name already exists', 400));

  const [resizedFile, height, width] = await resizeImage(receivedFile.data);

  const formattedName = name.replace(/\s/g, '');
  const dropboxPath = `/${category}/${formattedName}.jpg`;
  const fileStream = bufferToStream(resizedFile as Buffer);

  await postPictureToDropbox(dropboxPath, fileStream);
  const sharedLinkResponse = await generateShareableLink(dropboxPath);
  let sharedUrl = sharedLinkResponse.url;
  sharedUrl = sharedUrl.replace(/\?dl=0/, '?raw=1');

  const newImage = new Image({ name, height, width, img: sharedUrl, category });
  newImage
    .save()
    .then(() => {
      res.json('Picture added');
      logger.info(`Uploaded picture '${name}'`);
    })
    .catch((err) => next(new AppError(`Error: ${err}`, 400)));
}

async function getPicturesByCategory(req: Request, res: Response, next: NextFunction) {
  const { category } = req.params;
  Image.find({ category })
    .sort({ createdAt: -1 })
    .then((img: IImageModel[]) => res.json(img))
    .catch((err: Error) => next(new AppError(`Error getting pictures ${err}`, 400)));
}

async function getAllDetails(req: Request, res: Response, next: NextFunction) {
  Image.find({}, { name: 1, category: 1 })
    .sort({ createdAt: -1 })
    .then((img: IImageModel[]) => res.json(img))
    .catch((err: Error) => next(new AppError(`Error getting pictures ${err}`, 400)));
}

async function deleteImage(req: Request, res: Response, next: NextFunction) {
  Image.findByIdAndDelete(req.params.id)
    .then((img: IImageModel | null) => {
      if (img) {
        const msg = `Image with name: '${img.name}' was deleted.`;
        const dropboxName = img.name.replace(/\s/g, '');
        const dropboxPath = `/${img.category}/${dropboxName}.jpg`;
        deletePictureFromDropbox(dropboxPath);
        logger.info(msg);
        res.json(msg);
      } else {
        return next(new AppError('This id/picture does not exits', 400));
      }
    })
    .catch((err: Error) => next(new AppError(`Error deleting image: ${err}`, 400)));
}

export default { addImage, getAllDetails, deleteImage, getPicturesByCategory };
