import pino from 'pino';
import { Request, Response, NextFunction } from 'express';
import Blog from '../models/blog.model';
import { AppError } from '../middlewares/errorHandler';
import { IBlogModel } from '../interfaces/blog.interface';

const logger = pino({ level: process.env.LOG_LEVEL || 'info', prettyPrint: true });

async function getAllBlogs(req: Request, res: Response, next: NextFunction) {
  Blog.find({ draft: false }, { text: 0 })
    .sort({ createdAt: -1 })
    .then((blog: IBlogModel[]) => res.json(blog))
    .catch((err: Error) => next(new AppError(`Error: ${err}`, 400)));
}

async function getAllBlogsAsAdmin(req: Request, res: Response, next: NextFunction) {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((blog: IBlogModel[]) => res.json(blog))
    .catch((err: Error) => next(new AppError(`Error: ${err}`, 400)));
}

async function getBlogById(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params;
  Blog.findById(id)
    .then((blog: IBlogModel | null) => {
      if (blog === null) return next(new AppError('Blog does not exist', 404));
      if (blog.draft) return next(new AppError('Element is still a draft', 403));
      return blog;
    })
    .then((blog: IBlogModel | void) => res.json(blog))
    .catch((err: Error) => next(new AppError(`Error: ${err}`, 400)));
}

async function getBlogByIdAsAdmin(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params;
  Blog.findById(id)
    .then((blog: IBlogModel | null) => res.json(blog))
    .catch((err: Error) => next(new AppError(`Error: ${err}`, 400)));
}

async function updateBlog(req: Request, res: Response, next: NextFunction) {
  const { title, description, text, draft } = req.body;
  Blog.findById(req.params.id)
    .then((blog: IBlogModel | null) => {
      if (blog === null) return next(new AppError('Blog does not exist', 404));
      blog.title = title;
      blog.description = description;
      blog.text = text;
      blog.draft = draft;
      blog
        .save()
        .then(() => {
          logger.info(`Blog ${title} was updated`);
          res.json('Blog updated');
        })
        .catch((err: Error) => next(new AppError(`Error: ${err}`, 400)));
    })
    .catch((err: Error) => next(new AppError(`Error: ${err}`, 400)));
}

async function addBlog(req: Request, res: Response, next: NextFunction) {
  const { title, description, text, draft } = req.body;

  const newBlog = new Blog({ title, description, text, draft });
  newBlog
    .save()
    .then(() => {
      logger.info(`Blog ${title} was added`);
      res.json('Blog added!');
    })
    .catch((err: Error) => next(new AppError(`Error: ${err}`, 400)));
}

export default { getAllBlogs, getAllBlogsAsAdmin, getBlogById, getBlogByIdAsAdmin, updateBlog, addBlog };
