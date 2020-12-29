const pino = require('pino');
const Blog = require('../models/blog.model');
const { AppError } = require('../middlewares/errorHandler');

const logger = pino({ level: process.env.LOG_LEVEL || 'info', prettyPrint: true });

async function getAllBlogs(req, res, next) {
  Blog.find({ draft: false }, { text: 0 })
    .sort({ createdAt: -1 })
    .then((blog) => res.json(blog))
    .catch((err) => next(new AppError(`Error: ${err}`, 400)));
}

async function getAllBlogsAsAdmin(req, res, next) {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((blog) => res.json(blog))
    .catch((err) => next(new AppError(`Error: ${err}`, 400)));
}

async function getBlogById(req, res, next) {
  const { id } = req.params;
  Blog.findById(id)
    .then((blog) => {
      if (blog.draft) return next(new AppError('Element is still a draft', 403));
      return blog;
    })
    .then((blog) => res.json(blog))
    .catch((err) => next(new AppError(`Error: ${err}`, 400)));
}

async function getBlogByIdAsAdmin(req, res, next) {
  const { id } = req.params;
  Blog.findById(id)
    .then((blog) => res.json(blog))
    .catch((err) => next(new AppError(`Error: ${err}`, 400)));
}

async function updateBlog(req, res, next) {
  const { title, description, text, draft } = req.body;
  Blog.findById(req.params.id)
    .then((blog) => {
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
        .catch((err) => next(new AppError(`Error: ${err}`, 400)));
    })
    .catch((err) => next(new AppError(`Error: ${err}`, 400)));
}

async function addBlog(req, res, next) {
  const { title, description, text, draft } = req.body;

  const newBlog = Blog({ title, description, text, draft });
  newBlog
    .save()
    .then(() => {
      logger.info(`Blog ${title} was added`);
      res.json('Blog added!');
    })
    .catch((err) => next(new AppError(`Error: ${err}`, 400)));
}

module.exports = { getAllBlogs, getAllBlogsAsAdmin, getBlogById, getBlogByIdAsAdmin, updateBlog, addBlog };
