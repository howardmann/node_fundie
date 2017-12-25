// Dependencies
const Model = require('objection').Model
let Project = require('./project')
let Pledge = require('./pledge')

class User extends Model {
  static get tableName(){ return 'users'}
  
  static get relationMappings(){
    return {
      projects: {
        relation: Model.HasManyRelation,
        modelClass: Project,
        join: {
          from: 'users.id',
          to: 'projects.user_id'
        }
      },
      pledges: {
        relation: Model.HasManyRelation,
        modelClass: Pledge,
        join: {
          from: 'users.id',
          to: 'pledges.user_id'
        }
      }
    }
  }

  static get virtualAttributes() {
    return ['pledgesTotal', 'projectsTotal'];
  }

  pledgesTotal() {
    return this.pledges.reduce((tally, el) => tally += parseInt(el.amount),0);
  }

  projectsTotal() {
    return this.projects.reduce((tally, el) => tally += parseInt(el.target_amount), 0);
  }
  
  static catSay() {
    return Promise.resolve('miaow')
  }
}

module.exports = User