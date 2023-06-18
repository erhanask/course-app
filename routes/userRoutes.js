const userController = require('../controllers/userController');
const express = require('express');
const router = express.Router();

router.post('/create', userController.createUser);
router.post('/login', userController.loginUser);

module.exports = router;