let Image = require('../models/image.model');
const { AppError } = require('../middlewares/errorHandler');

async function addImage(req, res, next) {
  const { name, description } = req.body;
  let receivedFile = req.files;
  if (receivedFile === undefined || receivedFile === null) return next(new AppError('No file given', 400));
  receivedFile = receivedFile.file;
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
    .sort({ createdAt: -1 })
    .then((img) => {
      res.json(img);
    })
    .catch((err) => next(new AppError(`Error getting pictures ${err}`, 400)));
}

module.exports = { addImage, getImages };
