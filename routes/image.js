const router = require('express').Router();
const authorize = require('../middlewares/auth');
const imageController = require('../controller/image.controller');
const upload = require('../middlewares/upload');

router.route('/').get(imageController.getImages);
router.route('/add').post(authorize, imageController.addImage);
// router.route('/add').post(authorize, upload.single('image'), imageController.addImage);

module.exports = router;
