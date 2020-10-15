const express = require('express');
const { Recipe } = require('../models');
const router = express.Router();

// Database
const db = require('../models');

// Recipe Home Route
router.get('/', (req, res) => {
  db.Recipe.find().then(recipes => {
    console.log(recipes);
    res.render('recipes', {recipes});
  });
});

// Get Show
router.get('/:recipeId', (req, res) => {
  db.Recipe.findById(req.params.recipeId, (err,foundRecipe) => {
    const context = {
      recipe: foundRecipe,
    };
    res.render('recipes/show', context);
  });
});

// Create New Recipe
router.post('/new', (req, res) => {


  db.Recipe.create(req.body, (err, newRecipe) => {
    if (err) return console.log(err);

    console.log(newRecipe);
    res.redirect('/recipes');
  });
});

module.exports = router;