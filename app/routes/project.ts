import express from 'express';

const router = express.Router();

import ProjectController from '../controllers/projectController';

router.get('/', ProjectController.getAllProjects);
router.post('/', ProjectController.createProject);

export default router;
