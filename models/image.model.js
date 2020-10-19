const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, 'Please enter a name'] },
    description: { type: String, required: [true, 'Please enter a description'] },
    img: {
      data: Buffer,
      contentType: String,
    },
  },
  { timestamps: true }
);

const Image = mongoose.model('Image', imageSchema);

module.exports = Image;
