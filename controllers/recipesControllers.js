const express = require('express');
const { Recipe } = require('../models');
const router = express.Router();

// Database
const db = require('../models');

router.get('/', (req, res) => {
  db.Recipe.find().then(recipes => {
    console.log(recipes);
    res.render('recipes/index', {recipes});
  })
});

router.get('/:recipeId', (req, res) => {
  db.Recipe.findById(req.params.recipeId, (err,foundRecipe) => {
    const context = {
      recipe: foundRecipe,
    };
    res.render('recipes/show', context);
  })
})

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

module.exports = router;