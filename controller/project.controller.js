const pino = require('pino');
const Project = require('../models/project.model');
const { AppError } = require('../middlewares/errorHandler');

const logger = pino({ level: process.env.LOG_LEVEL || 'info', prettyPrint: true });

async function getProjects(req, res, next) {
  Project.find()
    .sort({ createdAt: -1 })
    .then((project) => res.json(project))
    .catch((err) => next(new AppError(`Error: ${err}`, 400)));
}

async function getProjectById(req, res, next) {
  Project.findById(req.params.id)
    .then((project) => res.json(project))
    .catch((err) => next(new AppError(`Error: ${err}`, 400)));
}

async function updateProject(req, res, next) {
  const { title, description, text, link } = req.body;
  const { id } = req.params;
  Project.findById(id)
    .then((project) => {
      project.title = title;
      project.description = description;
      project.text = text;
      project.link = link;

      project
        .save()
        .then(() => {
          logger.info(`Project ${title} was updated`);
          res.json('Project updated');
        })
        .catch((err) => next(new AppError(`Error: ${err}`, 400)));
    })
    .catch((err) => next(new AppError(`Error: ${err}`, 400)));
}

async function addProject(req, res, next) {
  const { title, description, text, link } = req.body;

  const newProject = Project({ title, description, text, link });
  newProject
    .save()
    .then(() => {
      logger.info(`Project ${title} was created`);
      res.json('Project added!');
    })
    .catch((err) => next(new AppError(`Error: ${err}`, 400)));
}

module.exports = { getProjects, getProjectById, updateProject, addProject };
