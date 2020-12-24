const router = require('express').Router();
const authorize = require('../middlewares/auth');
const blogController = require('../controller/blog.controller');

// get
router.route('/').get(blogController.getAllBlogs);
router.route('/admin').get(authorize, blogController.getAllBlogsAsAdmin);
router.route('/:id').get(blogController.getBlogById);
router.route('/admin/:id').get(authorize, blogController.getBlogByIdAsAdmin);

// post
router.route('/update/:id').post(authorize, blogController.updateBlog);
router.route('/add').post(authorize, blogController.addBlog);

module.exports = router;
