const router = require('express').Router();
import authorize from '../middlewares/auth';
import imageController from '../controller/image.controller';

// get
router.route('/:category').get(imageController.getPicturesByCategory);
router.route('/all/details').get(imageController.getAllDetails);

// post
router.route('/add').post(authorize(true), imageController.addImage);

// delete
router.route('/delete/:id').delete(authorize(true), imageController.deleteImage);

export default router;
