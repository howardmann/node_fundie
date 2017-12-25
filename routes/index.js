var express = require('express');
var router = express.Router();

// Require controllers
let users = require('../controllers/users.js');
let users2 = require('../controllers/users2.js');

// Home page
router.get('/', (req, res, next) => {
  res.json({status: 'ok'})
})

router
  .get('/users', users.index)
  .get('/users/:id', users.show)

router
  .get('/users2', users2.index)
  .get('/users2/:id', users2.show)
  .get('/catSay/', users2.catSay)
  

module.exports = router;