const mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const projectSchema = new Schema(
  {
    title: { type: String, required: [true, 'Please enter a titel'], unique: [true, 'No duplicate title allowed'] },
    description: { type: String, required: [true, 'Please enter a description'] },
    text: { type: String, required: [true, 'Please enter a text'] },
    link: { type: String, required: [true, 'Please enter a link'] },
  },
  { timestamps: true }
);

projectSchema.plugin(uniqueValidator);
const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
