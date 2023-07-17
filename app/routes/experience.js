const express = require('express');
const router = express.Router();

const experienceController = require('../controllers/experienceController');

router.get('/', experienceController.getAllExperience);
router.post('/', experienceController.createExperience);

module.exports = router;