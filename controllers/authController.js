const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

// Database
const db = require('../models');
const { create } = require('../models/User');

// Current Path = '/auth'

// ---------------------------- REGISTER

// GET Register Form
router.get('/register', (req, res) => {
  res.render('auth/register');
});

// POST Auth (Sign Up New User)
router.post('/', (req, res) => {
  // Check For Existing Account by Email Address
  db.User.findOne({email: req.body.email}, (err, user) => {
    if (err) return console.log(err);

    // If User Exists, redirect
    if (user) {
      console.log('User Account Already Exists');
      return res.redirect('/auth/register');
    }

    // Hash The User Password Before Creating User

    // Generate Hash Salt
    bcrypt.genSalt(10, (err, salt) => {
      if (err) return console.log('Error Generating Salt');
        // console.log(salt)

      bcrypt.hash(req.body.password, salt, (err, hashedPassword) => {
        if (err) return console.log('Error Hashing Password');

        // console.log(hashedPassword);

        // Create New User
        const newUser = {
          name: req.body.name,
          email: req.body.email,
          password: hashedPassword,
        }


        // Create New User with Hashed Password
        db.User.create(newUser, (err, createdUser) => {
          if (err) return console.log(err);

          console.log(createdUser);

          res.redirect('auth/login')
        });
      });
    });
  });
});


// ---------------------------- LOGIN

// GET Login Form
router.get('/login', (req, res) => {
  res.render('auth/login');
})


// POST Login Form
router.post('/login', (req, res) => {
  console.log(req.body);

  db.User.findOne({email: req.body.email}, (err, user) => { 
    if (err) return console.log(err);

    // Redirect to Login if No User Found
    if (!user) {
      console.log('Login Route: No User Found');
      return res.redirect('auth/login');
    };

    // Verify User Password With Login Form Password
    bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
      if (err) return console.log(err);

      if (isMatch) {
        // Create A New Session
        req.session.currentUser = user._id;

        res.redirect('/users');
      };  
    });
  });
});

// ---------------------------- LOGOUT

router.delete('/login', (req, res) => {
  if (req.session.currentUser) {
    req.session.destroy((err) => {
      if (err) return console.log('Error destroying session');

      res.redirect('/auth/login');
    });
  }
})


module.exports = router;