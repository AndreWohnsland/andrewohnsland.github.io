const router = require('express').Router();
const authorize = require('../middlewares/auth');
const imageController = require('../controller/image.controller');

router.route('/').get(imageController.getImages);
router.route('/add').post(authorize, imageController.addImage);

module.exports = router;
