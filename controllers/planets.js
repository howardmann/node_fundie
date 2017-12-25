let Planet = require('../models/planet');

exports.index = function (req, res, next) {
  Planet.find()
    .then(data => res.json(data))
    .catch(next)
};

exports.show = function (req, res, next) {
  Planet.findById(req.params.id)
    .then(data => res.json(data))
    .catch(next)
};

exports.create = function (req, res, next) {
  let { name } = req.body
  Planet.create({ name })
    .then(data => res.json(data))
    .catch(next)
}