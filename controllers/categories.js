let Category = require('../models/category');
let knex = require('../db/knex')
let _ = require('lodash');

exports.index = function (req, res, next) {
  Category
    .query()
    .then(data => {
      res.json(data)
    })
    .catch(next)
};

exports.show = function (req, res, next) {
  Category
    .query()
    .findById(req.params.id)
    .eager('projects')
    .then(data => {
      let projects = data.projects.map(project => _.pick(project, 'id', 'name'))
      let projectCount = _.get(data, 'projects', []).length
      let result = Object.assign(data, {projects, projectCount} )
      res.json(result)
    })
    .catch(next)
};

exports.create = function (req, res, next) {
  let params = pickParams(req.body)

  Category
    .query()
    .insert(params)
    .then((data) => {
      res.json(data)
    })
    .catch(next)
}

exports.update = function (req, res, next) {
  let params = pickParams(req.body)
  let id = req.params.id

  Category
    .query()
    .patchAndFetchById(id, params)
    .then((data) => {
      res.json(data)
    })
    .catch(next)
}

exports.delete = (req, res, next) => {
  let id = req.params.id
  Category
    .query()
    .delete().where({ id })
    .returning('*')
    .then((data) => res.json(data))
    .catch(next)
}


function pickParams(body) {
  return _.pick(body, ['name'])
}
