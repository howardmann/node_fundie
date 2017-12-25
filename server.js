require('dotenv').config()
var express = require('express');
var bodyParser = require('body-parser');

var app = express();

// Set bodyparser middleware
app.use(bodyParser.json());

// Routes 
app.use(require('./routes/index'));

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