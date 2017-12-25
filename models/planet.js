// Dependencies
let knex = require('../db/knex')
let Queries = require('../db/queries');

let Planet = new Queries('planets')

// Override with joins
Planet.find = () => {
  return knex.raw(`
    SELECT planets.*, json_agg(races.name) AS races, json_agg(champions.name) AS champions
      FROM planets
    LEFT OUTER JOIN planets_races ON planets_races.planet_id = planets.id
    LEFT OUTER JOIN races ON planets_races.race_id = races.id
    LEFT OUTER JOIN champions ON champions.race_id = races.id
    GROUP BY planets.id
    ORDER BY planets.id
  `)
  .then(data => data.rows)
}

Planet.findById = (id) => {
  return knex.raw(`
    SELECT planets.*, json_agg(races.name) AS races, json_agg(champions.name) AS champions
      FROM planets
    LEFT OUTER JOIN planets_races
      ON planets_races.planet_id = planets.id
    LEFT OUTER JOIN races
      ON planets_races.race_id = races.id
    LEFT OUTER JOIN champions
      ON champions.race_id = races.id
    WHERE planets.id = ${id}
    GROUP BY planets.id
    ORDER BY planets.id
  `)
  .then(data => data.rows)
}



module.exports = Planet