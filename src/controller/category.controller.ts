import { Request, Response, NextFunction } from 'express';
import { IBlogModel } from '../interfaces/blog.interface';
import { IProjectModel } from '../interfaces/project.interface';
import { AppError } from '../middlewares/errorHandler';
import Blog from '../models/blog.model';
import Project from '../models/project.model';

const filterCats = (categories: IBlogModel[]): String[] => {
  let allCats: String[] = [];
  categories.map((a) => allCats.push.apply(allCats, a.category));
  return [...new Set(allCats)];
};

async function getAllBlogCategories(req: Request, res: Response, next: NextFunction) {
  Blog.find()
    .select({ category: 1, _id: 0 })
    .then((cats: IBlogModel[]) => res.json(filterCats(cats)))
    .catch((err: Error) => next(new AppError(`Error: ${err}`, 400)));
}

async function getAllProjectCategories(req: Request, res: Response, next: NextFunction) {
  Project.find()
    .select({ category: 1, _id: 0 })
    .then((cats: IProjectModel[]) => res.json(filterCats(cats)))
    .catch((err: Error) => next(new AppError(`Error: ${err}`, 400)));
}

export default { getAllBlogCategories, getAllProjectCategories };
