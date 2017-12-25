let User = require('../models/user');

exports.index = function (req, res, next) {
  User.find()
    .then(data => res.json(data))
    .catch(next)
};

exports.show = function (req, res, next) {
  User.findById(req.params.id)
    .then(data => res.json(data))
    .catch(next)
};

