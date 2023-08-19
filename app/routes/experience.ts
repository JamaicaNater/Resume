import express from 'express';

const router = express.Router();

import experienceController from '../controllers/experienceController';
import ExperienceController from '../controllers/experienceController';

router.get('/', experienceController.getAllExperience);
router.put('/:id', ExperienceController.updateExperience);
router.post('/', experienceController.createExperience);
router.delete('/:id', ExperienceController.deleteExperience);

export default router;