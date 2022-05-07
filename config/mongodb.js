const mongoose = require('mongoose');
require('dotenv').config({ path: '.env' });

const { DB_MONGO } = process.env;

const mongodb = async () => {
  //attempts to connect to the database
  try {
    await mongoose.connect(DB_MONGO, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    });
    console.log(`the database is connected to ${DB_MONGO}`);
  } catch (error) {
    //In case of error, the error is displayed on the console
    console.error(error);
    process.exit(1); //holds the app
  }
}

module.exports = mongodb;