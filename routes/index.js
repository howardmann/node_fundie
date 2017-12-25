var express = require('express');
var router = express.Router();

// Require controllers
let races = require('../controllers/races.js');
let champions = require('../controllers/champions.js');
let planets = require('../controllers/planets.js');


// Home page
router.get('/', (req, res, next) => {
  res.json({status: 'ok'})
})

router
  .get('/races', races.index)
  .get('/races/:id', races.show)
  .post('/races', races.create)
  .put('/races/:id', races.update)

router
  .get('/champions', champions.index)
  .post('/champions', champions.create)

router
  .get('/planets', planets.index)
  .get('/planets/:id', planets.show)
  .post('/planets', planets.create)


module.exports = router;