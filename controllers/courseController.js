const Course = require('../models/Course');
const Category = require('../models/Category');


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
        const categorySlug = req.query.category;
        const category = await Category.findOne({slug:categorySlug})

        let filter = {};
        if(categorySlug) {
            filter = {category:category._id}
        }
        const courses = await Course.find(filter);
        res.render('courses', {
            title: 'Courses',
            courses: courses,
            categories: await categories()
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
          course: course,
          categories: await categories()
      });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message
    });
  }
};

const categories = async () => {
    return Category.find();
}