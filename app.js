const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const LocalStrategy = require('passport-local');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');

const app = express();

// MODELS
const User = require('./models/User');

// MONGOOSE CONFIG
mongoose.connect(keys.mongoURI);
mongoose.Promise = global.Promise;

// MIDDLEWARES
app.use(bodyParser.json());

// COOKIE CONFIG
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);

// PASSPORT CONFIG
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// ROUTES
require('./routes/expenseRoutes')(app);
require('./routes/vacationRoutes')(app);
require('./routes/userRoutes')(app);

// DEPLOYMENT CONFIG
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// FIRE IT UP
module.exports = app.listen(keys.port, process.env.IP, () => {
  console.log('Server is running');
});
