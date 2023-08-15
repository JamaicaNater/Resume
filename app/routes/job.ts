import express from 'express';

const router = express.Router();

import JobController from '../controllers/jobController';

router.get('/', JobController.getJob);
router.post('/', JobController.postJob)

module.exports = router;