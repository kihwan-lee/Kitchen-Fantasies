const express = require('express');
const { Recipe } = require('../models');
const router = express.Router();

// Database
const db = require('../models');

// Recipe Home Route
router.get('/', (req, res) => {
  db.Recipe.find()
    .then(recipes => {
    console.log(recipes);
    res.render('recipes', {recipes});
  })
  .catch((err) => {
    console.log(err);
    res.render('404');
  });
});

// Get New Recipe Route
router.get('/new', (req, res) => {
  if (!req.session.currentUser) {
    return res.redirect('/users');
  };
  db.User.find()
  .then(users => {
    console.log(users);
    res.render('recipes/new', {users});
  })
  .catch((err) => {
    console.log(err);
    res.render('404');
  });
});

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
    
    db.User.findById(req.body.user) 
      .then(user => {
        console.log(user);
        user.recipes.push(newRecipe._id);
        user.save();
        console.log(newRecipe);
        res.redirect('/recipes');
      })
      .catch((err) => {
        console.log(err);
        res.render('404');
      });
  });
});

// Show Recipe
router.get('/:recipeId', (req, res) => {
  // Query DB for recipe
  db.Recipe.findById(req.params.recipeId, (err, foundRecipe) => {

  db.User.findById(foundRecipe.user) 
    .then((foundUser) => {
      console.log(foundUser)

      const context = {
        recipe: foundRecipe,
        user: foundUser,
      };
      res.render('recipes/show', context);
    })
    .catch((err) => {
      console.log(err);
      res.render('404');
    });  
  });
});

// Edit Recipe
router.get('/:recipeId/edit', (req, res) => {
  if (!req.session.currentUser) {
    return res.redirect('/auth/login');
  };

  db.Recipe.findById(req.params.recipeId)
    .then((foundRecipe) => {
    const context = {
      recipe: foundRecipe,
    };
    // console.log(foundRecipe);
  res.render('recipes/edit', context);
  })
    .catch((err) => {
      console.log(err);
      res.render('404');
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