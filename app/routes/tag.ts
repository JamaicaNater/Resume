import express from 'express';

const router = express.Router();

import TagController from '../controllers/tagController';

router.get('/', TagController.getTags);
router.post('/', TagController.createTag);

module.exports = router;