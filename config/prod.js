// MAKE SURE TO ADD ENVIRONMENT VARS TO HEROKU FOR PRODUCTION
module.exports = {
  mongoURI: process.env.MONGO_URI,
  cookieKey: process.env.COOKIE_KEY,
  port: process.env.PORT
};
