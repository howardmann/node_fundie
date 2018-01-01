// Authentication
let passport = require('passport')
require('../db/passport.js')

exports.signup = passport.authenticate('local-signup', {
  successRedirect: '/',
  failureRedirect: '/fail',
  failureFlash: {
    type: 'message',
    message: 'Email is already taken'
  },
  successFlash: {
    type: 'message',
    message: 'Successfully signed up.'
  }
})

exports.login = passport.authenticate('local-login', {
  successRedirect: '/',
  failureRedirect: '/fail',
  failureFlash: {
    type: 'message',
    message: 'Email and/or password do not match.'
  },
  successFlash: {
    type: 'message',
    message: 'Successfully logged in.'
  }
})

exports.logout = function(req, res, next) {
  req.logout();
  req.flash('message', 'Succesfully logged out');
  res.redirect('/');
}

// =========AUTHORIZATION MIDDLEWARE=======
// Beautiful middleware syntax, if you are not authenticated then redirect, otherwise proceed with next
exports.loginRequired = function (req, res, next) {
  if (!req.isAuthenticated()) {
    req.flash('message', 'Must be authenticated');
    return res.redirect("/");
  }
  next()
};