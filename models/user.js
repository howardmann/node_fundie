// Dependencies
let knex = require('../db/knex')
let Queries = require('../db/queries');

let User = new Queries('users')

// Override default queries
User.find = () => {
  return knex.raw(`
    SELECT users.*, json_agg(DISTINCT projects.*) AS projects, json_agg(DISTINCT pledges.*) AS pledges
      FROM users
    LEFT OUTER JOIN projects
      ON projects.user_id = users.id
    LEFT OUTER JOIN pledges
      ON pledges.user_id = users.id
    GROUP BY users.id  
    ORDER BY users.id
  `).then(data => data.rows)
}

// Computed properties using SUM(DISTINCT ...)
User.findById = (id) => {
  return knex.raw(`
    SELECT 
      users.*, 
      json_agg(DISTINCT projects.*) AS projects, 
      json_agg(DISTINCT pledges.*) AS pledges, 
      SUM(DISTINCT pledges.amount) AS pledgesTotal,
      SUM(DISTINCT projects.target_amount) AS projectsTotal
    FROM users
    LEFT OUTER JOIN projects
      ON projects.user_id = users.id
    LEFT OUTER JOIN pledges
      ON pledges.user_id = users.id
    WHERE users.id = ${id}
    GROUP BY users.id      

  `).then(data => data.rows)
}

module.exports = User