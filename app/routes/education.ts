import express from 'express';

const router = express.Router();

import EducationController from '../controllers/educationController';

EducationController

router.get('/', EducationController.getAllEducation);
router.post('/', EducationController.createEducation);

export default router;