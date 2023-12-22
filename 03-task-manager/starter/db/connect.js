const mongoose = require('mongoose');


const connectDb = (connectionUrl) =>
  mongoose.connect(connectionUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  });


module.exports = connectDb;
