import pino from 'pino';
import { Request, Response, NextFunction } from 'express';
import Project from '../models/project.model';
import { AppError } from '../middlewares/errorHandler';
import { IProjectModel } from '../interfaces/project.interface';

const logger = pino({ level: process.env.LOG_LEVEL || 'info', prettyPrint: true });

async function getProjects(req: Request, res: Response, next: NextFunction) {
  Project.find({ draft: false }, { text: 0 })
    .sort({ createdAt: -1 })
    .then((project: IProjectModel[]) => res.json(project))
    .catch((err: Error) => next(new AppError(`Error: ${err}`, 400)));
}

async function getProjectsAsAdmin(req: Request, res: Response, next: NextFunction) {
  Project.find()
    .sort({ createdAt: -1 })
    .then((project: IProjectModel[]) => res.json(project))
    .catch((err: Error) => next(new AppError(`Error: ${err}`, 400)));
}

async function getProjectBySlug(req: Request, res: Response, next: NextFunction) {
  const { slug } = req.params;
  Project.findOne({ slug })
    .then((project: IProjectModel | null) => {
      if (project === null) return next(new AppError('Project does not exist', 404));
      if (project.draft) return next(new AppError('Element is still a draft', 403));
      return project;
    })
    .then((project: IProjectModel | void) => res.json(project))
    .catch((err: Error) => next(new AppError(`Error: ${err}`, 400)));
}

async function getProjectBySlugAsAdmin(req: Request, res: Response, next: NextFunction) {
  const { slug } = req.params;
  Project.findOne({ slug })
    .then((project: IProjectModel | null) => res.json(project))
    .catch((err: Error) => next(new AppError(`Error: ${err}`, 400)));
}

async function updateProject(req: Request, res: Response, next: NextFunction) {
  const { title, description, text, link, draft, category } = req.body;
  const { id } = req.params;
  Project.findById(id)
    .then((project: IProjectModel | null) => {
      if (project === null) return next(new AppError('Project does not exist', 404));
      project.title = title;
      project.description = description;
      project.text = text;
      project.link = link;
      project.draft = draft;
      project.category = category;

      project
        .save()
        .then(() => {
          logger.info(`Project ${title} was updated`);
          res.json(`Project ${title} updated`);
        })
        .catch((err) => next(new AppError(`Error: ${err}`, 400)));
    })
    .catch((err: Error) => next(new AppError(`Error: ${err}`, 400)));
}

async function addProject(req: Request, res: Response, next: NextFunction) {
  const { title, description, text, link, draft, category } = req.body;

  const newProject = new Project({ title, description, text, link, draft, category });
  newProject
    .save()
    .then(() => {
      logger.info(`Project ${title} was created`);
      res.json(`Project ${title} added!`);
    })
    .catch((err) => next(new AppError(`Error: ${err}`, 400)));
}

export default {
  getProjects,
  getProjectsAsAdmin,
  getProjectBySlug,
  getProjectBySlugAsAdmin,
  updateProject,
  addProject,
};
