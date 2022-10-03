import { Request, Response, NextFunction } from 'express';
import Resource from '../models/resource.model';
import { AppError } from '../middlewares/errorHandler';
import { IResourceModel } from '../interfaces/resource.interface';
import { bufferToStream, postPictureToDropbox, generateShareableLink, deletePictureFromDropbox } from './imageUtils';
import { UploadedFile } from 'express-fileupload';
import logger from '../setUp/initLogger';

async function addResource(req: Request, res: Response, next: NextFunction) {
  const { name, blogId } = req.body;
  const reqFile = req.files;
  if (name === undefined || blogId === undefined) return res.status(400).json({ message: 'Missing Data' });
  if (reqFile === undefined || reqFile === null) return next(new AppError('No file given', 400));
  const receivedFile = reqFile.file as UploadedFile;
  const filename = receivedFile.name;

  const dropboxPath = `/resources/${blogId}/${filename}`;
  const fileStream = bufferToStream(receivedFile.data as Buffer);

  await postPictureToDropbox(dropboxPath, fileStream);
  const sharedLinkResponse = await generateShareableLink(dropboxPath);
  let sharedUrl = sharedLinkResponse.url;
  sharedUrl = sharedUrl.replace(/\?dl=0/, '?raw=1');

  const resource = new Resource({ name, filename, blogId, link: sharedUrl });
  resource
    .save()
    .then(() => {
      res.json('Ressource added');
      logger.info(`Uploaded ressource '${name}' (${filename}) for blog ${blogId}`);
    })
    .catch((err) => next(new AppError(`Error: ${err}`, 400)));
}

async function deleteResource(req: Request, res: Response, next: NextFunction) {
  Resource.findByIdAndDelete(req.params.id)
    .then((resource: IResourceModel | null) => {
      if (resource) {
        const msg = `Resource with name: '${resource.name}' was deleted.`;
        const dropboxPath = `/resources/${resource.blogId}/${resource.filename}`;
        deletePictureFromDropbox(dropboxPath);
        logger.info(msg);
        res.json(msg);
      } else {
        return next(new AppError('This id/resource does not exits', 400));
      }
    })
    .catch((err: Error) => next(new AppError(`Error deleting image: ${err}`, 400)));
}

async function getAllDetails(req: Request, res: Response, next: NextFunction) {
  Resource.find({}, { name: 1, link: 1 })
    .sort({ createdAt: -1 })
    .then((img: IResourceModel[]) => res.json(img))
    .catch((err: Error) => next(new AppError(`Error getting resources ${err}`, 400)));
}

export default { addResource, deleteResource, getAllDetails };
