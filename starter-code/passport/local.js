const User = require('../models/User');
const passport = require('passport');
const bcrypt = require("bcrypt");
const LocalStrategy = require("passport-local").Strategy;
const path = require('path');

passport.use(new LocalStrategy((username, password, next) => {
  User.findOne({ username }, (err, user) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return next(null, false, { message: "Incorrect username entered" });
    }
    if (!bcrypt.compareSync(password, user.password)) {
      return next(null, false, { message: "Incorrect password entered" });
    }
    return next(null, user);
  });
}));
