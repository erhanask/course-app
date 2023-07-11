const User = require('../models/User');

exports.getIndex = async (req, res, next) => {
    const users = await User.find();

    res.render('admin/index', {
        users: users,
    });
}