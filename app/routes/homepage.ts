import express from 'express';

const router = express.Router();

import HomepageController from '../controllers/homepageController';

router.get('/', HomepageController.displayHomepage);

export default router;
