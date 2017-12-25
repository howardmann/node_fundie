var express = require('express');
var router = express.Router();

// Require controllers
let users = require('../controllers/users.js');

// Home page
router.get('/', (req, res, next) => {
  res.json({status: 'ok'})
})

router
  .get('/users', users.index)
  .get('/users/:id', users.show)

module.exports = router;