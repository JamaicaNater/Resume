const express = require('express');
const router = express.Router();

const HomepageController = require('../controllers/homepageController');

router.get('/', HomepageController.displayHomepage);

module.exports = router;
