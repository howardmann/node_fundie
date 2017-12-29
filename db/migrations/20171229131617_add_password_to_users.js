
exports.up = function(knex, Promise) {
  return knex.raw(`
    ALTER TABLE Users
      ADD COLUMN password VARCHAR(100);
  `)
};

exports.down = function(knex, Promise) {
  return knex.raw(`
    ALTER TABLE Users
      DROP COLUMN password;
  `)
  
};
