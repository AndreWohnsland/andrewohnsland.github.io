const router = require('express').Router();
const authorize = require('../middlewares/auth');
const userController = require('../controller/user.controller');

router.route('/add').post(authorize, userController.addUser);

router.route('/login').post(userController.login);

router.route('/auth').get(authorize, userController.getAuth);

module.exports = router;
