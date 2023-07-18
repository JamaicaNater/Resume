const express = require('express');
const router = express.Router();

const MeController = require('../controllers/meController')

router.get('/', MeController.getMe);
router.post('/', MeController.postMe);

module.exports = router;