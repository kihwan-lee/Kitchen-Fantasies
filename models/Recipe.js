// Please Work!
const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  cuisineType: {
    type: String,
    required: true,
  },
  totalCookTime: {
    type: String, 
    required: true,
  },
  ingridients: [{
    type: String,
    required: true,
  }],
  instructions: [{
    type: String,
    required: true,
  }],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
},{timestamps: true});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
