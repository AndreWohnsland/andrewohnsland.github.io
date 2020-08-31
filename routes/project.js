const router = require('express').Router();
const authorize = require('../middlewares/auth');
let Project = require('../models/project.model');

router.route('/').get((req, res) => {
  Project.find()
    .then((project) => res.json(project))
    .catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Project.findById(req.params.id)
    .then((project) => res.json(project))
    .catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post(authorize, (req, res) => {
  Project.findById(req.params.id)
    .then((project) => {
      project.title = req.body.title;
      project.description = req.body.description;
      project.text = req.body.text;
      project.link = req.body.link;

      project
        .save()
        .then(() => res.json('Project updated'))
        .catch((err) => res.status(400).json('Error: ' + err));
    })
    .catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/add').post(authorize, (req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  const text = req.body.text;
  const link = req.body.link;

  const newProject = Project({ title, description, text, link });
  newProject
    .save()
    .then(() => res.json('Project added!'))
    .catch((err) => res.status(400).json('Error: ' + err));
});

module.exports = router;
