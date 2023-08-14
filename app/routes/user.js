const express = require('express');
const router = express.Router();

const UserController = require('../controllers/userController')

router.get('/', UserController.getUsers);
router.post('/', UserController.postUser);

module.exports = router;