const express = require('express');
const router = express.Router();

const db = require('../models');


//User Home Route 
router.get('/', (req, res) => {
  res.render('users');
});

// User List Route
router.get('/new', (req, res) => {
  res.render('users/new');
});

// Create New User Route
router.post('/new', (req, res) => {

  // Query DB to create new user
  db.User.create(req.body, (err, newUser) => {
    if (err) return console.log(err);

    res.redirect('/users');
  });
});


module.exports = router;
