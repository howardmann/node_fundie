// Dependencies
const Project = require('objection').Model

Project.tableName = () => {
  return 'projects'
}

module.exports = Project

