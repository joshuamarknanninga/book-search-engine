// server/config/connection.js

const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // useCreateIndex: true, // Not needed in Mongoose 6+
  // useFindAndModify: false, // Not needed in Mongoose 6+
});

module.exports = mongoose.connection;
