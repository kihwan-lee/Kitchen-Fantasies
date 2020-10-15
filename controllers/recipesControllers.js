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


  db.Recipe.create(req.body, (err, newRecipe) => {
    if (err) return console.log(err);

    console.log(newRecipe);
    res.redirect('/recipes');
  });
});

module.exports = router;