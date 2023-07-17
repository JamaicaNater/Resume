const express = require('express');
const router = express.Router();

const UserController = require('../controllers/projectController');

router.get('/', UserController.getAllProjects);
router.post('/', UserController.createProject);

module.exports = router;
