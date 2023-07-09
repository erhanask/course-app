const Course = require('../models/Course');
const Category = require('../models/Category');
const User = require('../models/User');

const categories = async () => {
    return Category.find();
}

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

exports.deleteCourse = async (req, res) => {
    try {
        const course = await Course.findByIdAndDelete(req.body.id);
        res.status(200).json({
            status: 'success',
            data: course,
            message: 'Course deleted successfully'
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
}

exports.editCourse = async (req, res) => {
    try {
        const {id, title, short_description, long_description, price, category} = req.body;
        const course = await Course.findById(id);
        course.title = title;
        course.short_description = short_description;
        course.long_description = long_description;
        course.category = category;
        course.price = price;
        course.save();

        res.status(200).json({
            status: 'success',
            data: course,
            message: 'Course edited successfully'
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

        // search query
        if (req.query.search_k) {
            filter = {
                ...filter,
                title: {
                    $regex: '.*' + req.query.search_k + '.*',
                    $options: 'i'
                }
            }
        }

        const courses = await Course.find(filter).populate('user');
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

exports.enrollCourse = async (req, res) => {
    try {
        const user = await User.findById(req.session.user._id);
        user.courses.push({_id: req.body.id});
        await user.save();

        res.status(200).json({
            status: 'success',
            data: user,
            message: 'Course enrolled successfully'
        });
    } catch (err) {
        console.log(err);
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
}

exports.leaveCourse = async (req, res) => {
    try {
        const user = await User.findById(req.session.user._id);
        const { id } = req.body;
        user.courses.pull({_id: id});
        await user.save();

        res.status(200).json({
            status: 'success',
            data: user,
            message: 'Course left successfully'
        });
    } catch (err) {
        console.log(err);
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
}
