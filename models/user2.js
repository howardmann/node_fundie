// Dependencies
const Model = require('objection').Model
let Project = require('./project')
let Pledge = require('./pledge')
let Category = require('./category')

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
    if (!this.pledges || this.pledges.length === 0) {
      return null
    }
    return this.pledges.reduce((tally, el) => tally += parseInt(el.amount),0);
  }

  projectsTotal() {
    if (!this.projects || this.projects.length === 0) {
      return null
    }    
    return this.projects.reduce((tally, el) => tally += parseInt(el.target_amount), 0);
  }
  
  static catSay() {
    return Promise.resolve('miaow')
  }
}

module.exports = User