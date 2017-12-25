// Dependencies
let knex = require('../db/knex')
let Queries = require('../db/queries');

let Race = new Queries('races')

// Override default queries
Race.findById = (raceId) => {
  return knex.raw(`
    SELECT races.*, json_agg(planets.name) AS planets, json_agg(DISTINCT champions.name) AS champions
      FROM races
    LEFT OUTER JOIN champions
      ON races.id = champions.race_id
    LEFT OUTER JOIN planets_races
      ON races.id = planets_races.race_id
    LEFT OUTER JOIN planets
      ON planets.id = planets_races.planet_id
    WHERE races.id = ${raceId}
    GROUP BY races.id     
  `).then(data => data.rows)
}

Race.find = () => {
  return knex.raw(`
    SELECT races.name, json_agg(planets.name) AS planets
      FROM races
    LEFT OUTER JOIN planets_races
      ON races.id = planets_races.race_id
    LEFT OUTER JOIN planets
      ON planets.id = planets_races.planet_id
    GROUP BY races.name  
  `).then(data => data.rows)
}

Race.attachPlanets = (raceId, planetIdArr) => {
  return new Promise(resolve => {
    if (!planetIdArr) {
      return resolve()
    }

    let updateQueryArr = planetIdArr.map(planetId => knex.raw(`INSERT INTO planets_races (race_id, planet_id) VALUES (${raceId}, ${planetId})`))
    // Delete associations and then rebuild
    knex.raw(`DELETE FROM planets_races WHERE race_id = ${raceId}`)
      .then(() => Promise.all(updateQueryArr))
      .then(() => resolve(raceId))
  })
}

module.exports = Race