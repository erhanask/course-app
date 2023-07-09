const Category = require("../models/Category");
const Course = require("../models/Course");

exports.index = async (req, res) => {
    let params = {}

    if (req.session.user.role === 'teacher') {
        let categories = await Category.find();
        let courses = await Course.find({user: req.session.user._id});

        params = {...params, categories,courses};
    }


    res.render('dashboard', params);
}