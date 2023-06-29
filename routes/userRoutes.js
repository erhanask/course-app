const userController = require('../controllers/userController');
const dashboardController = require('../controllers/dashboardController');
const express = require('express');
const router = express.Router();

// Middlewares
const authMiddleware = require('../middlewares/auth');

// Routes
// Authentication Routes
router.post('/create', userController.createUser);
router.post('/login', userController.loginUser);
router.get('/logout', userController.logoutUser);

// Dashboard Routes
router.get('/dashboard', authMiddleware.auth, dashboardController.index)

module.exports = router;