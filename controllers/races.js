let Race = require('../models/race');

exports.index = function (req, res, next) {
  Race.find()  
    .then(data => res.json(data))
    .catch(next)
};

exports.show = function (req, res, next) {
  Race.findById(req.params.id)    
    .then(data => res.json(data))
    .catch(next)  
}

exports.update = function (req, res, next) {
  let {name, planet_id, affiliation} = req.body
  let raceId = req.params.id
  
  Race.attachPlanets(raceId, planet_id)
    .then(() => Race.update(raceId, { name, affiliation }))    
    .then(() => res.redirect(`/races/${raceId}`))
    .catch(next)
}

exports.create = function (req, res, next) {
  let { name, planet_id, affiliation } = req.body
  Race.create({name, affiliation})  
    .then(data => Race.attachPlanets(data.id, planet_id))
    .then((raceId) => res.redirect(`/races/${raceId}`))
    .catch(next)
}