let Pledge = require('../models/pledge');
let knex = require('../db/knex')
let _ = require('lodash');

let pledgeProperties = ['id','amount','comment','user[name]','project[name]']

exports.index = function (req, res, next) {
  Pledge
    .query()
    .eager('[user, project]')
    .then(data => {
      let result = data.map(pledge => _.pick(pledge, pledgeProperties))
      res.json(result)
    })
    .catch(next)
};

exports.show = function (req, res, next) {
  Pledge
    .query()
    .findById(req.params.id)
    .eager('[user, project]')
    .then(data => {
      let result =  _.pick(data, pledgeProperties)
      res.json(result)
    })
    .catch(next)
};

exports.create = function (req, res, next) {
  let params = pickParams(req.body)

  Pledge
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

  Pledge
    .query()
    .patchAndFetchById(id, params)
    .then((data) => {
      res.json(data)
    })
    .catch(next)
}

exports.delete = (req, res, next) => {
  let id = req.params.id
  Pledge
    .query()
    .delete().where({ id })
    .returning('*')
    .then((data) => res.json(data))
    .catch(next)
}


function pickParams(body) {
  return _.pick(body, ['comment', 'amount', 'user_id', 'project_id'])
}
