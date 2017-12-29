let knex = require('../knex.js');

exports.seed = async function (knex, Promise) {
  // ======Users
  // Clear out the DB
  await knex.raw('DELETE FROM Users')
  // Reset id number
  await knex.raw('ALTER SEQUENCE users_id_seq RESTART WITH 1')
  // Seed
  await knex.raw(`
    INSERT INTO Users (id, name, email) VALUES
    (1, 'Howie', 'howieburger@gmail.com'),
    (2, 'Hela', 'helabadga@gmail.com'),
    (3, 'Felix', 'ilovecroissants@gmail.com'),
    (4, 'Joseph', 'joseph@gmail.com')
  `)
  // Reset the auto increment interval 
  await knex.raw(`SELECT setval('users_id_seq', (SELECT MAX(id) FROM users)+1);`)

  // ======Projects
  // Clear out the DB
  await knex.raw('DELETE FROM Projects')
  // Reset id number
  await knex.raw('ALTER SEQUENCE projects_id_seq RESTART WITH 1')
  // Seed
  await knex.raw(`
    INSERT INTO Projects (id, name, user_id, target_amount, description) VALUES
    (1, 'Chariot', 1, 6000, 'TV series where horses ride humans.' ),
    (2, 'Fubar', 1, 4000, 'Hair salon which does the exact opposite of what you ask for.' ),
    (3, 'Snaptop', 2, 3000, 'Laptop which snaps shut randomly five times a day.' ),
    (4, 'Burger', 2, 4000, 'I am hungry please fund my burger supply for a year.' ),
    (5, 'Meth Lab', 3, 10000, 'Please support me in my future career. Early backers will receive a 10% discount on the best Ice in town.' ),
    (6, 'Mandarin Peeler', 4, 5000, 'Are you sick and tired of having to manually peel mandarins. With Mandarin Peeler, you can mail us your mandarins and we will ship them back peeled and tasty with a 7 day shipping guarantee.' ),
    (7, 'Moustache Moistener', 4, 7000, 'For the man who suffers from dry moustache syndrome.' )
  `)
  await knex.raw(`SELECT setval('projects_id_seq', (SELECT MAX(id) FROM projects)+1);`)
  
  // ======Pledges
  // Clear out the DB
  await knex.raw('DELETE FROM Pledges')
  // Reset id number
  await knex.raw('ALTER SEQUENCE pledges_id_seq RESTART WITH 1')
  // Seed
  await knex.raw(`
    INSERT INTO Pledges (amount, project_id, user_id, comment) VALUES
    (100, 1, 2, 'Go Howie'),
    (1000, 1, 3, 'I love horses'),
    (300, 2, 1, 'Go Hela'),
    (300, 4, 4, 'Yum burgers'),
    (500, 5, 2, 'Early bird gets the prize')
  `)

  // ======Categories
  // Clear out the DB
  await knex.raw('DELETE FROM Categories')
  // Reset id number
  await knex.raw('ALTER SEQUENCE categories_id_seq RESTART WITH 1')
  // Seed
  await knex.raw(`
    INSERT INTO Categories (name) VALUES
      ('art'),
      ('comics'),
      ('crafts'),
      ('dance'),
      ('design'),
      ('fashion'),
      ('film'),
      ('food'),
      ('games'),
      ('journalism'),
      ('music'),
      ('photography'),
      ('publishing'),
      ('technology'),
      ('theatre'),
      ('other')
  `)
  await knex.raw(`SELECT setval('categories_id_seq', (SELECT MAX(id) FROM categories)+1);`)

  // ======Categories_Projects
  // Clear out the DB
  await knex.raw('DELETE FROM Categories_Projects')
  // Seed
  await knex.raw(`
    INSERT INTO Categories_Projects (project_id, category_id) VALUES
      (1,1),
      (1,7),
      (2,2),
      (3,3),
      (4,8),
      (5,8),
      (5,14),
      (6,8),
      (7,6)
  `)

};
