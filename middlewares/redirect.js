exports.redirect = (req, res, next) => {
    if (req.session.user) {
        return res.redirect('/user/dashboard');
    }
    next();
}