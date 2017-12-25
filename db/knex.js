var environment = process.env.NODE_ENV || 'development';
var config = require('../knexfile.js')[environment];
var knex = require('knex')(config);

const objection = require('objection');
const Model = objection.Model;
Model.knex(knex);

module.exports = knex;