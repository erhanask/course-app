const courseController = require('../controllers/courseController');
const express = require('express');
const router = express.Router();

// Middlewares
const authMiddleware = require('../middlewares/auth');

// Routes
router.route('/:slug').get(courseController.getCourse);
router.route('/create').post(authMiddleware.role('teacher','admin') ,courseController.createCourse);
router.route('/enroll').post(authMiddleware.role('student','admin') ,courseController.enrollCourse);
router.route('/').get(courseController.getAllCourses);

module.exports = router;