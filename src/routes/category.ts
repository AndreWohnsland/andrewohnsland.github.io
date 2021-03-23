const router = require('express').Router();
import categoryController from '../controller/category.controller';

// get
router.route('/project').get(categoryController.getAllProjectCategories);
router.route('/blog').get(categoryController.getAllBlogCategories);

export default router;
