const courseController = require('../controllers/courseController');
const express = require('express');
const router = express.Router();

router.route('/create').post(courseController.createCourse);
router.route('/').get(courseController.getAllCourses);

module.exports = router;