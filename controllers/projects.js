let Project = require('../models/project');
let knex = require('../db/knex')

exports.index = function (req, res, next) {
  Project
    .query()
    .eager('[pledges, categories]')
    .then(data => res.json(data))
    .catch(next)
};

