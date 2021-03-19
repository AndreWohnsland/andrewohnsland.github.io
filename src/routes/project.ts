const router = require('express').Router();
import authorize from '../middlewares/auth';
import projectController from '../controller/project.controller';

// get
router.route('/').get(projectController.getProjects);
router.route('/admin').get(authorize, projectController.getProjectsAsAdmin);
router.route('/:id').get(projectController.getProjectById);
router.route('/admin/:id').get(authorize, projectController.getProjectByIdAsAdmin);

// post
router.route('/update/:id').post(authorize, projectController.updateProject);
router.route('/add').post(authorize, projectController.addProject);

export default router;
