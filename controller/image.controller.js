var fs = require('fs');
var path = require('path');
let Image = require('../models/image.model');
const { AppError } = require('../middlewares/errorHandler');

async function addImage(req, res, next) {
  const { name, description } = req.body;
  let receivedFile = req.files;
  if (receivedFile === undefined || receivedFile === null) return next(new AppError('No file given'));
  receivedFile = receivedFile.file;
  console.log(name, description, receivedFile);
  // return res.json('implement me');
  const img = {
    data: receivedFile.data,
    contentType: receivedFile.mimetype,
  };
  const newImage = Image({ name, description, img });
  newImage
    .save()
    .then(() => res.json('Picture added'))
    .catch((err) => next(new AppError('Error: ' + err, 400)));
}

async function getImages(req, res, next) {
  Image.find()
    .then((img) => res.json({ data: img }))
    .catch((err) => next(new AppError(`Error getting pictures ${err}`)));
}

module.exports = { addImage, getImages };
