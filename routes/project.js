const router = require('express').Router();
const authorize = require('../middlewares/auth');
const projectController = require('../controller/project.controller');

// get
router.route('/').get(projectController.getProjects);
router.route('/:id').get(projectController.getProjectById);

// post
router.route('/update/:id').post(authorize, projectController.updateProject);
router.route('/add').post(authorize, projectController.addProject);

module.exports = router;
