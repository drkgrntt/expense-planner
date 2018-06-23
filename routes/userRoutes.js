const User = require('../models/User');
const passport = require('passport');

module.exports = app => {
  // REGISTER USER
  app.post('/api/register', (req, res) => {
    // user info
    const newUser = new User({
      username: req.body.username,
      email: req.body.username
    });

    // register new user with their password
    User.register(newUser, req.body.password, (err, user) => {
      if (err) {
        res.send(err);
      }

      // create new user
      passport.authenticate('local')(req, res, () => {
        res.send(user);
      });
    });
  });

  // LOGIN USER
  app.post('/api/login', (req, res) => {
    passport.authenticate('local', (err, user) => {
      if (err) {
        return res.send(err);
      }

      if (!user) {
        return res.send({ message: 'Incorrect email or password.' });
      }

      req.login(user, loginErr => {
        if (loginErr) {
          return res.send(loginErr);
        }

        return res.send(user);
      });
    })(req, res);
  });

  // FETCH USER
  app.get('/api/currentUser', (req, res) => {
    res.send(req.user);
  });

  // LOGOUT USER
  app.get('/api/logout', (req, res) => {
    req.logout();
    res.send(req.user);
  });
};
