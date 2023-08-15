const express = require('express');
const router = express.Router();

import AuthController from '../controllers/authController';

router.get('/', AuthController.authenticate);
router.get('/logout', AuthController.logout);

module.exports = router;