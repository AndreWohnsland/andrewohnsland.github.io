const sizeOf = require('buffer-image-size');
const sharp = require('sharp');
let Image = require('../models/image.model');
const { AppError } = require('../middlewares/errorHandler');

const SIZE_LONG_SIDE = 800;
const cat = { foto: 'fotography', wood: 'woodwork' };

async function resizeImage(buffer) {
  const dimensions = sizeOf(buffer);
  const { height, width } = dimensions;
  let resizeOptions = { height: SIZE_LONG_SIDE };
  if (width > height) resizeOptions = { width: SIZE_LONG_SIDE };
  ret = await sharp(buffer).resize(resizeOptions).toBuffer();
  return ret;
}

async function addImage(req, res, next) {
  const { name, category } = req.body;
  let receivedFile = req.files;
  if (receivedFile === undefined || receivedFile === null) return next(new AppError('No file given', 400));
  receivedFile = receivedFile.file;
  const resizedFile = await resizeImage(receivedFile.data);
  const dimensions = sizeOf(resizedFile);
  const { height, width } = dimensions;
  const img = {
    data: resizedFile,
    contentType: receivedFile.mimetype,
  };
  const newImage = Image({ name, height, width, img, category });
  newImage
    .save()
    .then(() => res.json('Picture added'))
    .catch((err) => next(new AppError('Error: ' + err, 400)));
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

module.exports = { addImage, getFotographs, getWoodworks };
