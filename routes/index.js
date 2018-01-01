var express = require('express');
var router = express.Router();

// Require controllers
let users = require('../controllers/users.js');
let users2 = require('../controllers/users2.js');
let projects = require('../controllers/projects.js');
let pledges = require('../controllers/pledges.js');
let categories = require('../controllers/categories.js');
let auth = require('../controllers/auth.js')


// Home page
router.get('/', (req, res, next) => {
  res.json({url: '/', message: req.flash('message'), isLogin: req.isAuthenticated()})
})

router.get('/fail', (req, res, next) => {
  res.json({ url: '/fail', message: req.flash('message'), isLogin: req.isAuthenticated()})
})


router
  .get('/users', users.index)
  .get('/users/:id', users.show)

router
  .get('/users2', users2.index)
  .get('/users2/:id', users2.show)
  .get('/catSay/', users2.catSay)
  .get('/userCategories/', users2.userCategories)
  
router
  .get('/projects', projects.index)
  .get('/projects/:id', projects.show)
  .post('/projects', projects.create)
  .put('/projects/:id', projects.update)
  .delete('/projects/:id', projects.delete)

router
  .get('/pledges', pledges.index)
  .get('/pledges/:id', pledges.show)
  .post('/pledges', pledges.create)
  .put('/pledges/:id', pledges.update)
  .delete('/pledges/:id', pledges.delete)

router
  .get('/categories', categories.index)
  .get('/categories/:id', categories.show)
  .post('/categories', categories.create)
  .put('/categories/:id', categories.update)
  .delete('/categories/:id', categories.delete)

// Passport user signup, login
router
  .post('/signup', auth.signup)
  .post('/login', auth.login)
  .get('/logout', auth.logout)
  .get('/secret', auth.loginRequired, (req, res, next) => {
    res.json({secret: 42, isLogin: req.isAuthenticated()})
  })

module.exports = router;