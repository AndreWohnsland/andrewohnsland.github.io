const router = require('express').Router();
import authorize from '../middlewares/auth';
import blogController from '../controller/blog.controller';

// get
router.route('/').get(blogController.getAllBlogs);
router.route('/admin').get(authorize, blogController.getAllBlogsAsAdmin);
router.route('/:slug').get(blogController.getBlogBySlug);
router.route('/admin/:slug').get(authorize, blogController.getBlogBySlugAsAdmin);

// post
router.route('/update/:id').post(authorize, blogController.updateBlog);
router.route('/add').post(authorize, blogController.addBlog);

export default router;
