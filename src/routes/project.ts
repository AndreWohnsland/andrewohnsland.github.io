const router = require('express').Router();
import authorize from '../middlewares/auth';
import projectController from '../controller/project.controller';

// get
router.route('/').get(authorize(false), projectController.getProjects);
router.route('/:slug').get(authorize(false), projectController.getProjectBySlug);

// post
router.route('/update/:id').post(authorize(true), projectController.updateProject);
router.route('/add').post(authorize(true), projectController.addProject);

// delete
router.route('/:id').delete(authorize(true), projectController.deleteProject);

export default router;
