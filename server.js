// Modules
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

// DOTENV
// require('dotenv').config();
const PORT = 4000;

// DOTENV
// require('dotenv').config();
// const PORT = process.env.PORT;

// Set View Engine
app.set('view engine', 'ejs');

// Middleware
// Serve Static Assets (CSS, JS, IMAGES)
app.use(express.static(`${__dirname}/public`));




// Home Route
app.get('/', (req, res) => {
    res.render('index')
})


// Listener 
app.listen(PORT, () => {
    console.log(`Your server is on Port ${PORT}`);
})