import express from 'express';

const router = express.Router();

import ReferenceController from '../controllers/referenceController';

router.get('/', ReferenceController.getAllReferences);
router.put('/:id', ReferenceController.updateReference);
router.post('/', ReferenceController.createReference);
router.delete('/:id', ReferenceController.deleteReference);

export default router;