// Exports
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const mongoStore = require('connect-mongo');
const pageRoutes = require('./routes/pageRoutes');
const courseRoutes = require('./routes/courseRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const userRoutes = require('./routes/userRoutes');

// Defining Variables
const app = express();
const port = 3000;

// Database Connection
main().catch(err => console.log(err));
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/course-cms');
}


// Middleware
app.use(express.json());
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
    store: mongoStore.create({ mongoUrl: 'mongodb://127.0.0.1:27017/course-cms' })
}))

// TODO: URGENT: Fix the session issue for enroll and leave course actions
app.use((req, res, next) => {
    // getting the current path for use in the views
    res.locals.current_path = req.path;
    if (req.session.user) {
        res.locals.user = req.session.user;
        console.log(res.locals.user)
    }
    next();
})
app.use(express.urlencoded({extended: false}));


// View Engine
app.set('view engine', 'ejs');


// Static Files
app.use(express.static('public'));


// Routes
app.use('/', pageRoutes);
app.use('/courses', courseRoutes );
app.use('/categories', categoryRoutes );
app.use('/user', userRoutes);

// Start Connection
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
