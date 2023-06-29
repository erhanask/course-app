const pageController = require('../controllers/pageController');
const express = require('express');
const router = express.Router();

// Middlewares
const redirectMiddleware = require('../middlewares/redirect');

// Routes
router.get('/', pageController.getIndex);
router.get('/about', pageController.getAbout);
router.get('/login', redirectMiddleware.redirect, pageController.getLogin);

module.exports = router;
