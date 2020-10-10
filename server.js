const express = require('express');
const app = express();
const PORT = 4000;

// Set View Engine
app.set('view engine', 'ejs');


// Home Route
app.get('/', (req, res) => {
    res.render('index')
})



app.listen(PORT, () => {
    console.log(`Your server is on Port ${PORT}`);
})