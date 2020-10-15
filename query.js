const db = require('./models');




db.Recipe.create({
  name: 'Fried Egg',
  cuisineType: 'American',
  totalCookTime: '7 minutes',
  ingridients: ['1 Egg'],
  instructions: ['Cook the egg']
});

