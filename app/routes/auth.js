const express = require('express');
const router = express.Router();

const AuthController = require('../controllers/authController');

router.get('/', AuthController.authenticate);

module.exports = router;