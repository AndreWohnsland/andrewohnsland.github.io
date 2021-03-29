const router = require('express').Router();
import categoryController from '../controller/category.controller';

// get
router.route('/:category').get(categoryController.getAllDistinctCategories);

export default router;
