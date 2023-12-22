const mongoose = require('mongoose');


const connectDb = (url) =>
  mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  });


module.exports = connectDb;
