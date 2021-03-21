const router = require('express').Router();
import authorize from '../middlewares/auth';
import imageController from '../controller/image.controller';

// get
router.route('/fotography').get(imageController.getFotographs);
router.route('/woodwork').get(imageController.getWoodworks);
router.route('/all/details').get(imageController.getAllDetails);

// post
router.route('/add').post(authorize, imageController.addImage);

// delete
router.route('/delete/:id').delete(authorize, imageController.deleteImage);

export default router;
