const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    img: {
      data: Buffer,
      contentType: String,
    },
  },
  { timestamps: true }
);

const Image = mongoose.model('Image', imageSchema);

module.exports = Image;
