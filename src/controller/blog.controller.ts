import { Request, Response, NextFunction } from 'express';
import Blog from '../models/blog.model';
import { AppError } from '../middlewares/errorHandler';
import { IBlogModel } from '../interfaces/blog.interface';
import resourceController from './resource.controller';
import logger from '../setUp/initLogger';

async function getAllBlogs(req: Request, res: Response, next: NextFunction) {
  const { authenticated } = req.body;
  const { text } = req.query;
  const draftOptions = authenticated ? {} : { draft: false };
  const textOptions = text ? {} : { text: 0 };
  Blog.find(draftOptions, textOptions)
    .sort({ createdAt: -1 })
    .then((blog: IBlogModel[]) => res.json(blog))
    .catch((err: Error) => next(new AppError(`Error: ${err}`, 400)));
}

async function getBlogBySlug(req: Request, res: Response, next: NextFunction) {
  const { slug } = req.params;
  const { authenticated } = req.body;
  Blog.findOne({ slug })
    .then((blog: IBlogModel | null) => {
      if (blog === null) return next(new AppError('Blog does not exist', 404));
      if (blog.draft && !authenticated) return next(new AppError('Element is still a draft', 403));
      return blog;
    })
    .then((blog: IBlogModel | void) => res.json(blog))
    .catch((err: Error) => next(new AppError(`Error: ${err}`, 400)));
}

async function updateBlog(req: Request, res: Response, next: NextFunction) {
  const { title, description, text, draft, category } = req.body;
  Blog.findById(req.params.id)
    .then((blog: IBlogModel | null) => {
      if (blog === null) return next(new AppError('Blog does not exist', 404));
      blog.title = title;
      blog.description = description;
      blog.text = text;
      blog.draft = draft;
      blog.category = category;
      blog
        .save()
        .then(() => {
          logger.info(`Blog ${title} was updated`);
          res.json(`Blog ${title} updated`);
        })
        .catch((err: Error) => next(new AppError(`Error: ${err}`, 400)));
    })
    .catch((err: Error) => next(new AppError(`Error: ${err}`, 400)));
}

async function addBlog(req: Request, res: Response, next: NextFunction) {
  const { title, description, text, draft, category } = req.body;

  const newBlog = new Blog({ title, description, text, draft, category });
  newBlog
    .save()
    .then(() => {
      logger.info(`Blog ${title} was added`);
      res.json(`Blog ${title} added!`);
    })
    .catch((err: Error) => next(new AppError(`Error: ${err}`, 400)));
}

async function deleteBlog(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params;
  Blog.findById(req.params.id)
    .then((blog: IBlogModel | null) => {
      if (blog === null) return next(new AppError('Blog does not exist', 404));
      Blog.deleteOne({ _id: id }).then(async () => {
        logger.info(`Blog with id: ${id} (${blog.title}) was deleted`);
        await resourceController.deleteResourcesUsingBlogId(id);
        res.json(`Blog ${id} (${blog.title}) deleted`);
      });
    })
    .catch((err: Error) => next(new AppError(`Error: ${err}`, 400)));
}

export default { getAllBlogs, getBlogBySlug, updateBlog, addBlog, deleteBlog };
