const router = require('express').Router()
import authorize from '../middlewares/auth'
import resourceController from '../controller/resource.controller'

// get and post
router
  .route('/')
  .get(authorize(true), resourceController.getAllDetails)
  .post(authorize(true), resourceController.addResource)

// delete
router.route('/:id').delete(authorize(true), resourceController.deleteResource)

export default router
