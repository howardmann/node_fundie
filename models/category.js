// Dependencies
const Model = require('objection').Model

class Category extends Model {
  static tableName() { return 'categories' }
}

module.exports = Category

