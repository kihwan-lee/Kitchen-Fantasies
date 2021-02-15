const mongoose = require('mongoose');
const connectionString = process.env.MONGODB_URI;


mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log('MongoDB Connected');
});

mongoose.connection.on('error', (err) => {
  console.log(err);
});

module.exports = {
  User: require('./User'),
  Recipe: require('./Recipe')
}

