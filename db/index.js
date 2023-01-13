// Set up mongoose connection
const mongoose = require("mongoose");
//let database_url = 'mongodb+srv://divyamkshatriya:lokalatlaspassword@coredemand.ja4p5.mongodb.net/test';

// Connecting to the database

mongoose.connect("mongodb://localhost:27017/fmm", {

    keepAlive: true,
  })
  .then(() => {
    console.log("Successfully connected to the database");
  })
  .catch((err) => {
    console.log("Could not connect to the database. Exiting now...", err);
    process.exit();
  });

module.exports = mongoose.connection;
