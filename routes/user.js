const router = require('express').Router();
const authorize = require('../middlewares/auth');
const userController = require('../controller/user.controller');

// get
router.route('/auth').get(authorize, userController.getAuth);

// post
router.route('/add').post(authorize, userController.addUser);
router.route('/login').post(userController.login);
router.route('/change').post(authorize, userController.changePassword);

module.exports = router;
