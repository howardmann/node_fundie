let User = require('../models/user2');

exports.index = function (req, res, next) {
  User
    .query()
    .eager('[projects, pledges]')
    .then(data => res.json(data))
    .catch(next)
};

exports.show = function (req, res, next) {
  User
    .query()
    .where('id', req.params.id)
    .eager('[projects, pledges]')
    .then(data => res.json(data))
    .catch(next)
};

exports.catSay = function (req, res, next) {
  User
    .catSay()
    .then(data => res.json(data))
    .catch(next)
};