// Modules
const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const favicon = require('serve-favicon');
const session = require('express-session');
require('dotenv').config();
const PORT = process.env.PORT || 4000;
const app = express();



// Set View Engine
app.set('view engine', 'ejs');


// Controllers
const ctrl = require('./controllers');



// --------------------- Middleware

// Body Parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Method Override
app.use(methodOverride('_method'));

// Logging middleware passing our own configuration
app.use(morgan(':method :url'));

// Serve Static Assets (CSS, JS, IMAGES)
app.use(express.static(`${__dirname}/public`));

// Express Session
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,  // Only Save Session if Property Changes
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24  //expires in 24 hours
    }
}));

// Favicon Upload
app.use(favicon(`${__dirname}/public/images/favicon.ico`));






// --------------------- Routes


// Home Route
app.get('/', (req, res) => {
    res.render('index')
});

// About Us Route
app.get('/about', (req, res) => {
    res.render('about')
});

// Login Route
app.get('/login', (req, res) => {
    res.render('login')
});


// User Route
app.use('/users', ctrl.users);

// Recipe Route
app.use('/recipes', ctrl.recipes);

app.use('/auth', ctrl.auth);

// 404 Route
app.use('*', (req, res) => {
    res.render('404');
});  



// --------------------- Listener 
app.listen(PORT, () => {
    console.log(`Your server is on Port ${PORT}`);
});
