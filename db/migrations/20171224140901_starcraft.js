
exports.up = function(knex, Promise) {
  return knex.raw(`
    CREATE TABLE Races (
      id serial PRIMARY KEY,
      name varchar(255)
    );
    
    CREATE TABLE Champions (
      id serial PRIMARY KEY,
      name varchar(255),
      race_id int REFERENCES races ON DELETE SET NULL
    );
    
    CREATE TABLE Planets (
      id serial PRIMARY KEY,
      name varchar(255)
    );

    CREATE TABLE Planets_Races (
      planet_id int REFERENCES planets ON DELETE SET NULL,
      race_id int REFERENCES races ON DELETE SET NULL
    );
  `)
};

exports.down = function(knex, Promise) {
  return knex.raw(`
    DROP TABLE Champions CASCADE;
    DROP TABLE Races CASCADE;
    DROP TABLE Planets CASCADE;
    DROP TABLE Planets_Races CASCADE;
  `)  
};
