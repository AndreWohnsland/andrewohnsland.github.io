const mongoose = require('mongoose');

const { Schema } = mongoose;

const imageSchema = new Schema(
  {
    name: { type: String, required: [true, 'Please enter a name'] },
    width: Number,
    height: Number,
    img: {
      data: Buffer,
      contentType: String,
    },
    category: String,
  },
  { timestamps: true },
);

const Image = mongoose.model('Image', imageSchema);

module.exports = Image;
