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

// router.get('/', (req, res) => {
//   // Get all recipes
//   db.Recipe.find({}, (err, allRecipes) => {
//     console.log(Recipe);
//     if (err) return console.log(err);

//     const context = {allRecipes};

//     res.render('recipes/index', context);
//   })
// });

module.exports = router;