import express from 'express';

const router = express.Router();

import ReferenceController from '../controllers/referenceController';

router.get('/', ReferenceController.getAllReferences);
router.post('/', ReferenceController.createReference);

module.exports = router;