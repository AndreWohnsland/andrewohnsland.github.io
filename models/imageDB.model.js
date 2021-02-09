const mongoose = require('mongoose');

const { Schema } = mongoose;

const imageSchema = new Schema(
  {
    name: { type: String, required: [true, 'Please enter a name'] },
    width: Number,
    height: Number,
    img: { type: String, required: [true, 'Please enter a img url'] },
    category: String,
  },
  { timestamps: true },
);

const Image = mongoose.model('ImageDB', imageSchema);

module.exports = Image;
