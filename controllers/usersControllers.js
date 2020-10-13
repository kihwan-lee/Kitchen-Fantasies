const express = require('express');
const router = express.Router();

const db = require('../models');


//User Home Route 
router.get('/', (req, res) => {
  db.User.find().then(users => {
    console.log(users);
    res.render('users', {users});
  })
});

// User List Route
router.get('/new', (req, res) => {
  res.render('users/new');
});

// Create New User 
router.post('/new', (req, res) => {

  // Query DB to create new user then go to Community
  db.User.create(req.body, (err, newUser) => {
    if (err) return console.log(err);

    res.redirect('/users');
  });
});

// Show User When Clicked from Community
router.get('/:userName', (req, res) => {
  // Query DB for user
  db.User.find().then(user => {
    console.log(user);
    const context = {
      user: user,
    };

    res.render('users/show', context);
  });
});

// // Edit User
router.get('/:userName/edit', (req, res) => {
  // Query DB for user
  db.User.find().then(user => {
    console.log(user);

    const context = {
      user: user,
    };

    res.render('users/edit', context);
  });
});

module.exports = router;
