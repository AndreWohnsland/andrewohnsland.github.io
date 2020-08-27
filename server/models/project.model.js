const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const projectSchema = new Schema(
  {
    title: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    text: { type: String, required: true },
    link: { type: String, required: true },
  },
  { timestamps: true }
);

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
