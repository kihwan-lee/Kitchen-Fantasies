const mongoose = require('mongoose');
mongoose.connect(PORT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})