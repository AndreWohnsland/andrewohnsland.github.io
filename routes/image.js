const router = require('express').Router();
const authorize = require('../middlewares/auth');
const imageController = require('../controller/image.controller');

router.route('/fotography').get(imageController.getFotographs);
router.route('/woodwork').get(imageController.getWoodworks);
router.route('/add').post(authorize, imageController.addImage);

module.exports = router;
