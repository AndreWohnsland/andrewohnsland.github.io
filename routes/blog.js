const router = require('express').Router();
const authorize = require('../middlewares/auth');
const blogController = require('../controller/blog.controller');

router.route('/').get(blogController.getAllBlogs);
router.route('/:id').get(blogController.getBlogById);

router.route('/update/:id').post(authorize, blogController.updateBlog);
router.route('/add').post(authorize, blogController.addBlog);

module.exports = router;
