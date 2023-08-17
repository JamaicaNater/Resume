const express = require('express');
const router = express.Router();

import AuthController from '../controllers/authController';

router.get('/', AuthController.authenticate);
router.get('/logout', AuthController.logout);
router.post('/register', AuthController.register);

export default router;