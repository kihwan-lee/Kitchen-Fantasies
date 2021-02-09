const express = require('express');
const { Recipe } = require('../models');
const router = express.Router();

// Database
const db = require('../models');

// Recipe Home Route
router.get('/', (req, res) => {
  db.Recipe.find().then(recipes => {
    if (err) return console.log(err);

    console.log(recipes);
    res.render('recipes', {recipes});
  });
});

// Get New Recipe Route
router.get('/new', (req, res) => {
  if (!req.session.currentUser) {
    return res.redirect('/users');
  };
  db.User.find().then(users => {
    if (err) return console.log(err);

    
    res.render('recipes/new', {users});
  })
})

// Create New Recipe
router.post('/new', (req, res) => {
  if (!req.session.currentUser) {
    return res.redirect('/users');
  };

  req.body.user = req.session.currentUser;

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
    
    db.User.findById(req.body.user, (err, user) => {
      if (err) return console.log(err);
      console.log(user);
      
      user.recipes.push(newRecipe._id);
      user.save();
      console.log(newRecipe);
      res.redirect('/recipes');
    });
  });
});

// Show Recipe
router.get('/:recipeId', (req, res) => {
  // Query DB for recipe
  db.Recipe.findById(req.params.recipeId, (err, foundRecipe) => {
    if (err) return console.log(err);


  db.User.findById(foundRecipe.user, (err, foundUser) => {
    if (err) return console.log(err);

    const context = {
      recipe: foundRecipe,
      user: foundUser,
    };
    res.render('recipes/show', context);
  });  
  });
});

// Edit Recipe
router.get('/:recipeId/edit', (req, res) => {
  if (!req.session.currentUser) {
    return res.redirect('/auth/login');
  };

  db.Recipe.findById(req.params.recipeId, (err, foundRecipe) => {
    if (err) return console.log(err);

    const context = {
      recipe: foundRecipe,
    };
    // console.log(foundRecipe);
  res.render('recipes/edit', context);
  });
});

// PUT Update
router.put('/:recipeId', (req, res) => { 
  db.Recipe.findByIdAndUpdate(req.params.recipeId, req.body, {new: true}, (err, updatedRecipe) => {
    if (err) return console.log(err);

    res.redirect('/recipes');
  });
});

// Delete Recipe
router.delete('/:recipeId', (req, res) => {
  if (!req.session.currentUser) {
    return res.redirect('/auth/login');
  };
  // Query DB to delete record by ID
  db.Recipe.findByIdAndDelete(req.params.recipeId, (err, deletedRecipe) => {
    if (err) return console.log(err);

    console.log(deletedRecipe);

    // Redirect to index route
    res.redirect('/recipes');
  });
});


module.exports = router;