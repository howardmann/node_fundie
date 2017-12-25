
exports.up = function(knex, Promise) {
  return knex.raw(`
    ALTER TABLE Races 
    ADD Affiliation varchar(50);    
  `)  
};

exports.down = function(knex, Promise) {
  return knex.raw(`
    ALTER TABLE Races 
    DROP COLUMN Affiliation;    
  `)    
};
