// Dependencies
let knex = require('./knex.js');

// Queries factory function which requires table name
let Queries = function(table){
  let Table = () => knex(table)
  // // Using knex queries
  // this.find = () => Table().select()
  // this.findById = (id) => Table().where('id', parseInt(id)).first()
  // this.findBy = (property, name) => Table().where(property, name)
  this.create = (body) => Table().insert(body).returning('*').then(result => result[0])
  this.update = (id, updates) => Table().where('id', parseInt(id)).update(updates).returning('*')
  // this.delete = (id) => Table().where('id', parseInt(id)).del()
  // this.destroyAll = () => Table().del()
  // this.resetId = () => knex.raw(`ALTER SEQUENCE ${table}_id_seq RESTART WITH 1`)
  // Postgresql nested single join query
  // this.findByIdJoin = (id, joinTable) => {
  //   return Table()
  //     .join(joinTable, `${table}.id`, `${joinTable}.${table.slice(0, -1)}_id`)
  //     .where(`${table}.id`, id)
  //     .select([
  //       `${table}.*`,
  //       knex.raw(`json_agg(${joinTable}.*) as ${joinTable}`)
  //     ])
  //     .groupBy(`${table}.id`)
  // }
  
  // Using raw SQL queries
  this.find = () => knex.raw(`SELECT * FROM ${table}`).then((data) => data.rows)
  this.findById = (id) => knex.raw(`SELECT * FROM ${table} WHERE id=${id}`).then(data => data.rows[0])
  this.findBy = (property, name) => knex.raw(`SELECT * FROM ${table} WHERE lower(${property}) = '${name}'`).then(data => data.rows)
  // Note it is easier to use knex helpers to write create and update queries
  this.delete = (id) => knex.raw(`DELETE FROM ${table} WHERE id=${parseInt(id)}`)
  this.destroyAll = () => knex.raw(`DELETE FROM ${table}`)
  this.resetId = () => knex.raw(`ALTER SEQUENCE ${table}_id_seq RESTART WITH 1`)
  this.findByIdJoin = (id, joinTable) => {
    return knex.raw(`
      SELECT ${table}.*, json_agg(${joinTable}.*) as ${joinTable}
      FROM ${table}
      LEFT OUTER JOIN ${joinTable}
      ON ${table}.id = ${joinTable}.${table.slice(0, -1)}_id
      WHERE ${table}.id= ${parseInt(id)}
      GROUP BY ${table}.id
    `).then(data => data.rows)
  }
}

module.exports = Queries