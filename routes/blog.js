const router = require('express').Router();
const authorize = require('../middlewares/auth');
let Blog = require('../models/blog.model');
const blogControler = require('../controller/blog.controler');

router.route('/').get(blogControler.getAllBlogs);
router.route('/:id').get(blogControler.getBlogById);

router.route('/update/:id').post(authorize, blogControler.updateBlog);
router.route('/add').post(authorize, blogControler.addBlog);

module.exports = router;
