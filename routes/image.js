const router = require('express').Router();
const authorize = require('../middlewares/auth');
const imageController = require('../controller/image.controller');

// get
router.route('/fotography').get(imageController.getFotographs);
router.route('/woodwork').get(imageController.getWoodworks);
router.route('/all/details').get(imageController.getAllDetails);

// post
router.route('/add').post(authorize, imageController.addImage);

// delete
router.route('/delete/:id').delete(authorize, imageController.deleteImage);

module.exports = router;
