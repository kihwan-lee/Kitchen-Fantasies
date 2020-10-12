const mongoose = require('mongoose');

mongoose.connect(PORT, {
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
  User: require('./User')
}
