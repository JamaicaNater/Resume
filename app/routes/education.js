const express = require('express');
const router = express.Router();

const EducationController = require('../controllers/educationController');

EducationController

router.get('/', EducationController.getAllEducation);
router.post('/', EducationController.createEducation);

module.exports = router;