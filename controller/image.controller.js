const sizeOf = require('buffer-image-size');
const pino = require('pino');
const Image = require('../models/imageDB.model');
const { AppError } = require('../middlewares/errorHandler');
const {
  resizeImage,
  bufferToStream,
  postPictureToDropbox,
  generateShareableLink,
  deletePictureFromDropbox,
} = require('./imageUtils');

const logger = pino({ level: process.env.LOG_LEVEL || 'info', prettyPrint: true });

const cat = { foto: 'fotography', wood: 'woodwork' };

async function addImage(req, res, next) {
  const { name, category } = req.body;
  let receivedFile = req.files;
  if (receivedFile === undefined || receivedFile === null) return next(new AppError('No file given', 400));
  receivedFile = receivedFile.file;

  const sameName = await Image.findOne({ name });
  if (sameName !== null) return next(new AppError('Name already exists', 400));

  const resizedFile = await resizeImage(receivedFile.data);
  const dimensions = sizeOf(resizedFile);
  const { height, width } = dimensions;

  const formattedName = name.replace(/\s/g, '');
  const dropboxPath = `/${category}/${formattedName}.jpg`;
  const fileStream = bufferToStream(resizedFile);

  await postPictureToDropbox(dropboxPath, fileStream);
  const sharedLinkResponse = await generateShareableLink(dropboxPath);
  let sharedUrl = sharedLinkResponse.url;
  sharedUrl = sharedUrl.replace(/\?dl=0/, '?raw=1');

  const newImage = Image({ name, height, width, img: sharedUrl, category });
  newImage
    .save()
    .then(() => res.json('Picture added'))
    .catch((err) => next(new AppError(`Error: ${err}`, 400)));
}

async function getFotographs(req, res, next) {
  Image.find({ $or: [{ category: cat.foto }, { category: null }] })
    .sort({ createdAt: -1 })
    .then((img) => {
      res.json(img);
    })
    .catch((err) => next(new AppError(`Error getting pictures ${err}`, 400)));
}

async function getWoodworks(req, res, next) {
  Image.find({ category: cat.wood })
    .sort({ createdAt: -1 })
    .then((img) => {
      res.json(img);
    })
    .catch((err) => next(new AppError(`Error getting pictures ${err}`, 400)));
}

async function getAllDetails(req, res, next) {
  Image.find({}, { name: 1, category: 1 })
    .sort({ createdAt: -1 })
    .then((img) => {
      res.json(img);
    })
    .catch((err) => next(new AppError(`Error getting pictures ${err}`, 400)));
}

async function deleteImage(req, res, next) {
  Image.findByIdAndDelete(req.params.id)
    .then((img) => {
      if (img) {
        const msg = `Image with name: ${img.name} was deleted.`;
        const dropboxName = img.name.replace(/\s/g, '');
        const dropboxPath = `/${img.category}/${dropboxName}.jpg`;
        deletePictureFromDropbox(dropboxPath);
        logger.info(msg);
        res.json(msg);
      } else {
        return next(new AppError('This id/picture does not exits', 400));
      }
    })
    .catch((err) => next(new AppError(`Error deleting image: ${err}`, 400)));
}

module.exports = { addImage, getFotographs, getWoodworks, getAllDetails, deleteImage };
