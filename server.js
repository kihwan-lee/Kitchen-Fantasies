// Modules
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

const PORT = 4000;

// DOTENV
// require('dotenv').config();
// const PORT = process.env.PORT;

// Set View Engine
app.set('view engine', 'ejs');


// Controllers
const userCtrl = require('./controllers/usersControllers');


// --------------------- Middleware

// Body Parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Method Override
app.use(methodOverride('_method'));


// Serve Static Assets (CSS, JS, IMAGES)
app.use(express.static(`${__dirname}/public`));


// --------------------- Routes

// Home Route
app.get('/', (req, res) => {
    res.render('index')
});

// About Us Route
app.get('/about', (req, res) => {
    res.render('about')
});

// User Route
app.use('/users', userCtrl);

// 404 Route
app.use('*', (req, res) => {
    res.render('404');
});  



// --------------------- Listener 
app.listen(PORT, () => {
    console.log(`Your server is on Port ${PORT}`);
});
