const pageController = require('../controllers/pageController');
const express = require('express');
const router = express.Router();

router.get('/', pageController.getIndex);
router.get('/about', pageController.getAbout);

module.exports = router;
