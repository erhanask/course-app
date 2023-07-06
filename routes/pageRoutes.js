const pageController = require('../controllers/pageController');
const express = require('express');
const router = express.Router();

// Middlewares
const redirectMiddleware = require('../middlewares/redirect');

// Routes
router.get('/', pageController.getIndex);
router.get('/about', pageController.getAbout);
router.get('/login', redirectMiddleware.redirect, pageController.getLogin);
router.get('/contact', pageController.getContact);
router.post('/contact', pageController.sendContact);

module.exports = router;
