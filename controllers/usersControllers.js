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
router.get('/:userId', (req, res) => {
  // Query DB for user
  db.User.findById(req.params.userId, (err, foundUser) => {
    const context = {
      user: foundUser,
    };
    console.log(foundUser);
    res.render('users/show', context);
  });
});


// // Edit User
router.get('/:userId/edit', (req, res) => {
  // Query DB for user
  db.User.findById(req.params.userId, (err, foundUser) => {
    if (err) return console.log(err);

    const context = {
      user: foundUser,
    };

    res.render('users/edit', context);
  })
});

router.put('/:userId', (req, res) => {
  // VALIDATE DATA (Coming soon)
  // Query DB to update record by ID
  db.User.findByIdAndUpdate(
    req.params.userId,
    req.body,
    {new: true},
    (err, updatedUser) => {
      if (err) return console.log(err);

      // Redirect to show route
      res.redirect(`/users`);
    }
  );
});

router.delete('/:userId', (req, res) => {
  // Query DB to delete record by ID
  db.User.findByIdAndDelete(req.params.userId, (err, deletedUser) => {
    if (err) return console.log(err);

    // Redirect to index route
    res.redirect('/users');
  });
});


module.exports = router;
