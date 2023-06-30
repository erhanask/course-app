exports.auth = (req, res, next) => {
    if (!req.session.user) {
        return res.redirect('/user/login');
    }
    next();
};

exports.role = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.session.user.role)) {
            return res.redirect('/');
        }
        next();
    }
}