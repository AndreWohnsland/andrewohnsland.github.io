import { Request, Response, NextFunction } from 'express';
import { AppError } from '../middlewares/errorHandler';
import Blog from '../models/blog.model';
import Project from '../models/project.model';
import Image from '../models/imageDB.model';

enum supportedModels {
  project = 'project',
  blog = 'blog',
  image = 'image',
}

async function getAllDistinctCategories(req: Request, res: Response, next: NextFunction) {
  const { category } = req.params;
  const mongoModel = selectModel(category);
  if (mongoModel === undefined) return next(new AppError(`${category} not supported for categories`, 404));
  mongoModel
    .distinct('category')
    .then((cats: string[]) => res.json(cats.sort()))
    .catch((err: Error) => next(new AppError(`Error getting categories for ${category}: ${err}`, 400)));
}

function selectModel(modeltype: string) {
  if (modeltype === supportedModels.project) return Project;
  if (modeltype === supportedModels.blog) return Blog;
  if (modeltype === supportedModels.image) return Image;
  return undefined;
}

export default { getAllDistinctCategories };
