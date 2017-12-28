// Dependencies
const Model = require('objection').Model

class Pledge extends Model  {
  static tableName(){ return 'pledges' }
  static get relationMappings() {
    return {
      project: {
        relation: Model.BelongsToOneRelation,
        modelClass: __dirname + "/project.js",
        join: {
          from: 'pledges.project_id',
          to: 'projects.id'
        }
      },
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: __dirname + "/user2.js",
        join: {
          from: 'pledges.user_id',
          to: 'users.id'
        }
      }
    }
  }
  
}

module.exports = Pledge

