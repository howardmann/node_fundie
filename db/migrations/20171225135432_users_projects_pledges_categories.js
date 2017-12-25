
exports.up = function(knex, Promise) {
  return knex.raw(`
    CREATE TABLE Users (
      id serial PRIMARY KEY,
      name VARCHAR(255),
      email VARCHAR(255),
      bank DECIMAL(13,2) DEFAULT 5000
    );
    
    CREATE TABLE Projects (
      id serial PRIMARY KEY,
      name varchar(255),
      description varchar(255),
      target_amount DECIMAL(13,2),
      user_id int REFERENCES users ON DELETE SET NULL
    );
    
    CREATE TABLE Pledges (
      id serial PRIMARY KEY,
      amount DECIMAL(13,2),
      comment VARCHAR(255),
      user_id int REFERENCES users ON DELETE SET NULL,
      project_id int REFERENCES projects ON DELETE SET NULL
    );

    CREATE TABLE Categories (
      id serial PRIMARY KEY,
      name VARCHAR(255)
    );

    CREATE TABLE Categories_Projects (
      project_id int REFERENCES projects ON DELETE SET NULL,
      category_id int REFERENCES categories ON DELETE SET NULL
    );

  `)  
};

exports.down = function(knex, Promise) {
  return knex.raw(`
    DROP TABLE Users CASCADE;
    DROP TABLE Projects CASCADE;
    DROP TABLE Pledges CASCADE;
    DROP TABLE Categories CASCADE;
    DROP TABLE Categories_Projects CASCADE;
  `)    
};
