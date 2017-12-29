// Authentication
let passport = require('passport')
require('../db/passport.js')

exports.signup = passport.authenticate('local-signup', {
  successRedirect: '/',
  failureRedirect: '/fail',
  failureFlash: {
    type: 'signupMessage',
    message: 'Email is already taken'
  },
  successFlash: {
    type: 'signupMessage',
    message: 'Successfully signed up.'
  }
})


