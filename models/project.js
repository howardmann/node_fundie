// Dependencies
const Model = require('objection').Model
let Pledge = require('./pledge')
let Category = require('./category')

class Project extends Model {
  static get tableName() { return 'projects' }
  static get relationMappings() {
    return {
      pledges: {
        relation: Model.HasManyRelation,
        modelClass: Pledge,
        join: {
          from: 'projects.id',
          to: 'pledges.project_id'
        }
      },
      categories: {
        relation: Model.ManyToManyRelation,
        modelClass: Category,
        join: {
          from: 'projects.id',
          through: {
            from: 'categories_projects.project_id',
            to: 'categories_projects.category_id'
          },
          to: 'categories.id'
        }        
      }
    }
  }

  static get virtualAttributes() {
    return ['pledgesTotal', 'shortfall'];
  }

  pledgesTotal() {
    if (!this.pledges || this.pledges.length === 0) {
      return null
    }
    return this.pledges.reduce((tally, el) => tally += parseInt(el.amount), 0);
  }
  shortfall() {
    let shortfall = parseInt(this.target_amount) - this.pledgesTotal()
    return shortfall
  }
  
}

module.exports = Project

