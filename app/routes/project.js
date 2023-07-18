const express = require('express');
const router = express.Router();

const ProjectController = require('../controllers/projectController');

router.get('/', ProjectController.getAllProjects);
router.post('/', ProjectController.createProject);

module.exports = router;
