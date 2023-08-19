import express from 'express';

const router = express.Router();

import UserController from '../controllers/userController';

router.get('/', UserController.getUsers);
router.get('/me', UserController.getMe);
router.put('/me', UserController.updateMe);
router.post('/', UserController.postUser);

export default router;