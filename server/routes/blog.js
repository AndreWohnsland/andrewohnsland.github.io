const router = require('express').Router();
let Blog = require('../models/blog.model');

router.route('/').get((req, res) => {
  Blog.find()
    .then((blog) => res.json(blog))
    .catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Blog.findById(req.params.id)
    .then((blog) => res.json(blog))
    .catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Blog.findById(req.params.id)
    .then((blog) => {
      blog.title = req.body.title;
      blog.description = req.body.description;
      blog.text = req.body.text;

      blog
        .save()
        .then(() => res.json('Blog updated'))
        .catch((err) => res.status(400).json('Error: ' + err));
    })
    .catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  const text = req.body.text;

  const newBlog = Blog({ title, description, text });
  newBlog
    .save()
    .then(() => res.json('Blog added!'))
    .catch((err) => res.status(400).json('Error: ' + err));
});

module.exports = router;
