import { Request, Response, NextFunction } from 'express'
import Project from '../models/project.model'
import { AppError } from '../middlewares/errorHandler'
import { IProjectModel } from '../interfaces/project.interface'
import logger from '../setUp/initLogger'

async function getProjects(req: Request, res: Response, next: NextFunction) {
  const { authenticated } = req.body
  const { text } = req.query
  const draftOptions = authenticated ? {} : { draft: false }
  const textOptions = text ? {} : { text: 0 }
  Project.find(draftOptions, textOptions)
    .sort({ createdAt: -1 })
    .then((project: IProjectModel[]) => res.json(project))
    .catch((err: Error) => next(new AppError(`Error: ${err}`, 400)))
}

async function getProjectBySlug(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { slug } = req.params
  const { authenticated } = req.body
  Project.findOne({ slug })
    .then((project: IProjectModel | null) => {
      if (project === null)
        return next(new AppError('Project does not exist', 404))
      if (project.draft && !authenticated)
        return next(new AppError('Element is still a draft', 403))
      return project
    })
    .then((project: IProjectModel | void) => res.json(project))
    .catch((err: Error) => next(new AppError(`Error: ${err}`, 400)))
}

async function updateProject(req: Request, res: Response, next: NextFunction) {
  const { title, description, text, link, draft, category } = req.body
  const { id } = req.params
  Project.findById(id)
    .then((project: IProjectModel | null) => {
      if (project === null)
        return next(new AppError('Project does not exist', 404))
      project.title = title
      project.description = description
      project.text = text
      project.link = link
      project.draft = draft
      project.category = category

      project
        .save()
        .then(() => {
          logger.info(`Project ${title} was updated`)
          res.json(`Project ${title} updated`)
        })
        .catch((err) => next(new AppError(`Error: ${err}`, 400)))
    })
    .catch((err: Error) => next(new AppError(`Error: ${err}`, 400)))
}

async function addProject(req: Request, res: Response, next: NextFunction) {
  const { title, description, text, link, draft, category } = req.body

  const newProject = new Project({
    title,
    description,
    text,
    link,
    draft,
    category,
  })
  newProject
    .save()
    .then(() => {
      logger.info(`Project ${title} was created`)
      res.json(`Project ${title} added!`)
    })
    .catch((err) => next(new AppError(`Error: ${err}`, 400)))
}

async function deleteProject(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params
  Project.findById(req.params.id)
    .then((project: IProjectModel | null) => {
      if (project === null)
        return next(new AppError('Project does not exist', 404))
      Project.deleteOne({ _id: id }).then(() => {
        logger.info(`Project with id: ${id} (${project.title}) was deleted`)
        res.json(`Project ${id} (${project.title}) deleted`)
      })
    })
    .catch((err: Error) => next(new AppError(`Error: ${err}`, 400)))
}

export default {
  getProjects,
  getProjectBySlug,
  updateProject,
  addProject,
  deleteProject,
}
