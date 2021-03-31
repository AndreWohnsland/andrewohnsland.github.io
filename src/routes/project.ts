const router = require('express').Router();
import authorize from '../middlewares/auth';
import projectController from '../controller/project.controller';

// get
router.route('/').get(projectController.getProjects);
router.route('/admin').get(authorize, projectController.getProjectsAsAdmin);
router.route('/:slug').get(projectController.getProjectBySlug);
router.route('/admin/:slug').get(authorize, projectController.getProjectBySlugAsAdmin);

// post
router.route('/update/:id').post(authorize, projectController.updateProject);
router.route('/add').post(authorize, projectController.addProject);

export default router;
