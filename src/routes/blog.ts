const router = require('express').Router();
import authorize from '../middlewares/auth';
import blogController from '../controller/blog.controller';

// get
router.route('/').get(authorize(false), blogController.getAllBlogs);
router.route('/:slug').get(authorize(false), blogController.getBlogBySlug);

// post
router.route('/update/:id').post(authorize(true), blogController.updateBlog);
router.route('/add').post(authorize(true), blogController.addBlog);

export default router;
