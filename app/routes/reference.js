const express = require('express');
const router = express.Router();

const ReferenceController = require('../controllers/referenceController');

router.get('/', ReferenceController.getAllReferences);
router.post('/', ReferenceController.createReference);

module.exports = router;