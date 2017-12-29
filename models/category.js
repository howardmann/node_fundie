// Dependencies
const Model = require('objection').Model

class Category extends Model {
  static tableName() { return 'categories' }
  static get relationMappings() {
    return {
      projects: {
        relation: Model.ManyToManyRelation,
        modelClass: __dirname + "/project.js",
        join: {
          from: 'categories.id',
          through: {
            from: 'categories_projects.category_id',
            to: 'categories_projects.project_id'
          },
          to: 'projects.id'
        }
      }
    }
  }
  
}

module.exports = Category

