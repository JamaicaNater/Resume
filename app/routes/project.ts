import express from 'express';

const router = express.Router();

import ProjectController from '../controllers/projectController';

router.get('/', ProjectController.getAllProjects);
router.put('/:id', ProjectController.updateProject)
router.post('/', ProjectController.createProject);
router.delete('/:id', ProjectController.deleteProject)

export default router;
