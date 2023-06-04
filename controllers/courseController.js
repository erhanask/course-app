const Course = require('../models/Course');


exports.createCourse = async (req, res) => {
    try {
        const course = await Course.create(req.body);
        res.status(201).json({
            status: 'success',
            data: course
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
}

exports.getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find();
        res.render('courses', {
            title: 'Courses',
            courses: courses
        })
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
}

exports.getCourse = async (req, res) => {
  try {
      const course = await Course.findOne({slug: req.params.slug});
      res.render('course-single',{
          title: 'Course Detail',
          course: course
      });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};