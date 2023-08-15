import express from 'express';

const router = express.Router();

import HomepageController from '../controllers/homepageController';

router.get('/', HomepageController.displayHomepage);

module.exports = router;
