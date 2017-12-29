require('dotenv').config()
var express = require('express');
var bodyParser = require('body-parser');
var knexLogger = require('knex-logger');
var knex = require('./db/knex')

// Authentication
var passport = require('passport')
// var session = require('express-session')
var session = require('cookie-session')
var flash = require('connect-flash');

var app = express();

// app.use(knexLogger(knex));
// Set bodyparser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Authentication
// express-session stored in mem
// Only exists during application runtime, if server reboots, loses all session data
// app.use(session({
//   secret: 'keyboard cat',
//   resave: true,
//   saveUninitialized: true
// }))

// cookie-session stored in cookie
// Difference is it persists beyond application runtime but stores more data in client cookie
app.use(session({
  name: 'session',
  keys: ['keyboard cat']
}))

app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

// Routes 
app.use(require('./routes/index'))

// Catch and send error messages
app.use(function (err, req, res, next) {
  if (err) {
    res.status(422).send({
      error: err.message
    });
  } else {
    next();
  }
});

// 404
app.use(function (req, res) {
  res.status(404).send('Page does not exist');
});

// Expose and listen
app.listen(3000, function () {
  console.log('Listening to port 3000');
});

module.exports = app;