const Category = require("../models/Category");

exports.index = async (req, res) => {
    let params = {}

    if (req.session.user.role === 'teacher') {
        let categories = await Category.find();
        params = {...params, categories};
    }


    res.render('dashboard', params);
}