const courseController = require('../controllers/courseController');
const express = require('express');
const router = express.Router();

router.route('/create').post(courseController.createCourse);

module.exports = router;