let Project = require('../models/project.model');
const { AppError } = require('../middlewares/errorHandler');

async function getProjects(req, res, next) {
  Project.find()
    .sort({ createdAt: -1 })
    .then((project) => res.json(project))
    .catch((err) => next(new AppError('Error: ' + err, 400)));
}

async function getProjectById(req, res, next) {
  Project.findById(req.params.id)
    .then((project) => res.json(project))
    .catch((err) => next(new AppError('Error: ' + err, 400)));
}

async function updateProject(req, res, next) {
  Project.findById(req.params.id)
    .then((project) => {
      project.title = req.body.title;
      project.description = req.body.description;
      project.text = req.body.text;
      project.link = req.body.link;

      project
        .save()
        .then(() => res.json('Project updated'))
        .catch((err) => next(new AppError('Error: ' + err, 400)));
    })
    .catch((err) => next(new AppError('Error: ' + err, 400)));
}

async function addProject(req, res, next) {
  const title = req.body.title;
  const description = req.body.description;
  const text = req.body.text;
  const link = req.body.link;

  const newProject = Project({ title, description, text, link });
  newProject
    .save()
    .then(() => res.json('Project added!'))
    .catch((err) => next(new AppError('Error: ' + err, 400)));
}

module.exports = { getProjects, getProjectById, updateProject, addProject };
