// Exports
const express = require('express');
const pageRoutes = require('./routes/pageRoutes');

// Defining Variables
const app = express();
const port = 3000;


// Middleware
app.use((req, res, next) => {
    // getting the current path for use in the views
    res.locals.current_path = req.path;
    next();
})


// View Engine
app.set('view engine', 'ejs');


// Static Files
app.use(express.static('public'));


// Routes
app.use('/', pageRoutes);

// Start Connection
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
