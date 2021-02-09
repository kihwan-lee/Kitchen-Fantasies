const express = require('express');
const router = express.Router();

const db = require('../models');
const { update } = require('../models/User');


//User Home Route 
router.get('/', (req, res) => {
  db.User.find()
  .then(users => {
    console.log(users);
    res.render('users', {users});
  })
  .catch((err) => {
    console.log(err);
  })
});

// User List Route
router.get('/new', (req, res) => {
  res.render('users/new');
});

// Create New User 
router.post('/new', (req, res) => {

  // Query DB to create new user then go to Community
  db.User.create(req.body)
  .then((newUser) => {
    console.log(newUser);
    res.redirect('/users');
  })
  .catch((err) => {
    console.log(err);
  });
});

// Show User When Clicked from Community
router.get('/:userId', (req, res) => {
  // Query DB for user
  db.User.findById(req.params.userId)
  .populate('recipes')
  .then(foundUser => {
    const context = {
      user: foundUser,
    };
  
    console.log(foundUser);
    res.render('users/show', context);
  })
  .catch((err) => {
    console.log(err)
    res.render('404');
  })
});


// // Edit User
router.get('/:userId/edit', (req, res) => {
  if (!req.session.currentUser) {
    return res.redirect('/auth/login');
  };

  // Query DB for user
  db.User.findById(req.params.userId)
  .then((foundUser) => {
    console.log(foundUser);

    const context = {
      user: foundUser,
    };

    res.render('users/edit', context);
  })
  .catch((err) => {
    console.log(err);
    res.render('404');
  });
});

router.put('/:userId', (req, res) => {
  // Query DB to update record by ID
  db.User.findByIdAndUpdate(
    req.params.userId,
    req.body,
    {new: true}
    .then((updatedUser) => {
      console.log(updatedUser);
    
      // Redirect to show route
      res.redirect(`/users`);
    })
    .catch((err) => {
      console.log(err);
      res.render('404');
    })
  );
});

router.delete('/:userId', (req, res) => {
  if (!req.session.currentUser) {
    return res.redirect('/auth/login');
  };
  // Query DB to delete record by ID
  db.User.findByIdAndDelete(req.params.userId)
  .then((deletedUser) => {
    console.log(deletedUser);

    // Redirect to index route
    res.redirect('/users');
  })
  .catch((err) => {
    console.log(err);
    res.render('404');
  });
});


module.exports = router;
