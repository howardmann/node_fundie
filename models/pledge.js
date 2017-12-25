// Dependencies
const Model = require('objection').Model

class Pledge extends Model  {
  static tableName(){ return 'pledges' }
}

module.exports = Pledge

