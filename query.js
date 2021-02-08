const db = require('./models');


db.User.create({
  name: 'John',
  email: 'JohnDoe@gmail.com',
  password: 'JohnDoe1',
  recipes: []
})


// db.Recipe.create({
//   name: 'Fried Egg',
//   cuisineType: 'American',
//   totalCookTime: '7 minutes',
//   ingridients: ['1 Egg'],
//   instructions: ['Cook the egg']
// });

