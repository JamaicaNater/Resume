import express from 'express';

const router = express.Router();

import experienceController from '../controllers/experienceController';

router.get('/', experienceController.getAllExperience);
router.post('/', experienceController.createExperience);

export default router;