const router = require('express').Router();
import authorize from '../middlewares/auth';
import userController from '../controller/user.controller';

// get
router.route('/auth').get(authorize(true), userController.getAuth);

// post
router.route('/add').post(authorize(true), userController.addUser);
router.route('/login').post(userController.login);
router.route('/change').post(authorize(true), userController.changePassword);

export default router;
