const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.getLogin = (req, res) => {
    res.render('login');
}

exports.createUser = async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json({
            status: 'success',
            data: user
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }
}

exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({email});

        if (!user) {
            throw new Error('User not found');
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            throw new Error('Password is not correct');
        }

        req.session.user = user;

        res.status(200).json({
            status: 'success',
            data: user
        });
    } catch (err) {
     res.status(400).json({
            status: 'fail',
            message: err.message
     });
    }
}

exports.logoutUser = (req, res) => {
    req.session.destroy();
    res.redirect('/');
}