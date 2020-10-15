const express = require('express');
const { Recipe } = require('../models');
const router = express.Router();

// Database
const db = require('../models');

// Get Recipe
router.get('/', (req, res) => {
  db.Recipe.find().then(recipes => {
    console.log(recipes);
    res.render('recipes/index', {recipes});
  })
});

// Get Show
router.get('/:recipeId', (req, res) => {
  db.Recipe.findById(req.params.recipeId, (err,foundRecipe) => {
    const context = {
      recipe: foundRecipe,
    };
    res.render('recipes/new', context);
  })
})

// POST create
router.post('/', (req, res) => {
  console.log(req.body);

  // Query DB to create new author
  db.Recipe.create(req.body, (err, newRecipe) => {
    if (err) return console.log(err);

    res.redirect('/recipes');
  });
});

module.exports = router;