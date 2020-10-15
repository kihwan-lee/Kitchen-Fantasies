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

// Get New Recipe Route
router.get('/new', (req, res) => {
  res.render('recipes/new')
})

// Create New Recipe
router.post('/new', (req, res) => {
  let ingridArr = req.body.ingridients.split(',');
  let instructArr = req.body.instructions.split(',');

  db.Recipe.create({
    name:req.body.name,
    cuisineType:req.body.cuisineType,
    totalCookTime:req.body.totalCookTime,
    ingridients:ingridArr,
    instructions:instructArr,
    user:req.body.user
    }, (err, newRecipe) => {
    if (err) return console.log(err);

    console.log(newRecipe);
    res.redirect('/recipes');
  });
});

router.get('/:recipeId', (req, res) => {
  // Query DB for user
  db.Recipe.findById(req.params.recipeId, (err, foundRecipe) => {
    const context = {
      recipe: foundRecipe,
    };
    console.log(foundRecipe);
    res.render('recipes/show', context);
  });
});

module.exports = router;