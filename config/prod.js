// MAKE SURE TO ADD ENVIRONMENT VARS TO HEROKU FOR PRODUCTION
module.exports = {
  mongoURI: process.env.MONGO_URI,
  // process.env.PORT is built into Heroku
};
