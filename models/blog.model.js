const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const blogSchema = new Schema(
  {
    title: { type: String, required: [true, 'Please enter a titel'], unique: [true, 'No duplicate title allowed'] },
    description: { type: String, required: [true, 'Please enter a description'] },
    text: { type: String, required: [true, 'Please enter a text'] },
  },
  { timestamps: true }
);

blogSchema.plugin(uniqueValidator);
const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
