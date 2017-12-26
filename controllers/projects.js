let Project = require('../models/project');
let knex = require('../db/knex')
let _ = require('lodash');

exports.index = function (req, res, next) {
  Project
    .query()
    .eager('[pledges, categories]')
    .then(data => res.json(data))
    .catch(next)
};

exports.show = function (req, res, next) {
  Project
    .query()
    .findById(req.params.id)
    .eager('[pledges, categories]')
    .then(data => res.json(data))
    .catch(next)
};

exports.create = async function (req, res, next) {
  let params = pickParams(req.body)
  
  let project = await Project.query().insert(params)
  
  project
    .$relatedQuery('categories').relate([1, 7])
    .then(() => res.redirect(`projects/${project.id}`))
    .catch(next)    
}

function pickParams(body) {
  return _.pick(body, ['name', 'description', 'target_amount', 'user_id'])
}