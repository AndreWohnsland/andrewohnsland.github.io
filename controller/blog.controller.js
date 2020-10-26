const Blog = require('../models/blog.model');
const { AppError } = require('../middlewares/errorHandler');

async function getAllBlogs(req, res, next) {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((blog) => res.json(blog))
    .catch((err) => next(new AppError(`Error: ${err}`, 400)));
}

async function getBlogById(req, res, next) {
  Blog.findById(req.params.id)
    .then((blog) => res.json(blog))
    .catch((err) => next(new AppError(`Error: ${err}`, 400)));
}

async function updateBlog(req, res, next) {
  Blog.findById(req.params.id)
    .then((blog) => {
      blog.title = req.body.title;
      blog.description = req.body.description;
      blog.text = req.body.text;

      blog
        .save()
        .then(() => res.json('Blog updated'))
        .catch((err) => next(new AppError(`Error: ${err}`, 400)));
    })
    .catch((err) => next(new AppError(`Error: ${err}`, 400)));
}

async function addBlog(req, res, next) {
  const { title, description, text } = req.body;

  const newBlog = Blog({ title, description, text });
  newBlog
    .save()
    .then(() => res.json('Blog added!'))
    .catch((err) => next(new AppError(`Error: ${err}`, 400)));
}

module.exports = { getAllBlogs, getBlogById, updateBlog, addBlog };
