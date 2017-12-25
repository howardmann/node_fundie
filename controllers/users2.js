let User = require('../models/user2');
let knex = require('../db/knex')

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

// Write raw SQL, objection.js can't manage has_many assoc through a many_to_many
exports.userCategories = function (req, res, next) {
  knex.raw(`
    SELECT
      users.*, 
      json_agg(categories.*) AS categories, 
      json_agg(pledges.*) AS pledges, 
      json_agg(projects.*) AS projects
    FROM users
    LEFT OUTER JOIN pledges
      ON pledges.user_id = users.id    
    LEFT OUTER JOIN projects
      ON projects.user_id = users.id
    LEFT OUTER JOIN categories_projects
      ON categories_projects.project_id = projects.id
    LEFT OUTER JOIN categories
      ON categories_projects.category_id = categories.id
    GROUP BY users.id
  `)
  .then(data => res.json(data.rows))
  .catch(next)  
}
