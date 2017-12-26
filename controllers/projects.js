let Project = require('../models/project');
let knex = require('../db/knex')
let _ = require('lodash');
const asyncHandler = require('express-async-handler')

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
  let {category_ids} = req.body
  
  let project = await Project.query().insert(params)
  
  project
    .$relatedQuery('categories').relate(category_ids)
    .then(() => res.redirect(`projects/${project.id}`))
    .catch(next)    
}

exports.update = asyncHandler(async (req, res, next) => {
  let params = pickParams(req.body)
  let { category_ids } = req.body
  let id = req.params.id

  let project = await Project.query().patchAndFetchById(id, params)
  if (category_ids) {
    await project.$relatedQuery('categories').unrelate()
    await project.$relatedQuery('categories').relate(category_ids)
  }
  res.redirect(`/projects/${project.id}`)
})

exports.delete = (req, res, next) => {
  let id = req.params.id
  Project
    .query()
    .delete().where({id})
    .returning('*')
    .then((data) => res.json(data))
    .catch(next)
}


function pickParams(body) {
  return _.pick(body, ['name', 'description', 'target_amount', 'user_id'])
}