const express = require('express');
const router = express.Router();

const JobController = require('../controllers/jobController');

router.get('/', JobController.getJob);
router.post('/', JobController.postJob)

module.exports = router;