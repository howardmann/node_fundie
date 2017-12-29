let passport = require('passport')
let LocalStrategy = require('passport-local').Strategy
let User = require('../models/user2')
let bcrypt = require('bcrypt')

passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  },
  function (req, email, password, done) {
    User
      .query()
      .where('email', email)
      .then(user => {
        if (user.length > 0) {
          return done(null, false);
        }

        User
          .query()
          .insert({
            name: req.body.name,
            email: email,
            password: bcrypt.hashSync(password, 10)            
          })
          .then(newUser => {
            return done(null, newUser)
          })        
      })
  }
));

passport.serializeUser(function (user, done) {
  done(null, user)
})

passport.deserializeUser(function (user, done) {
  done(null, user)
})

