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

