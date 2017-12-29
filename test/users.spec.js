// Testing dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let expect = chai.expect;
chai.use(chaiHttp);

let util = require('util')

// App dependencies
let app = require('../server.js');
let knex = require('../db/knex');

describe('#Users', function () {
  // Before each test we rollback the migrations and run the seed file again
  let reset = function (done) {
    knex.migrate.rollback()
      .then(() => knex.migrate.latest())
      .then(() => knex.seed.run())
      .then(() => done())
  }

  beforeEach(reset);
  afterEach(reset);

  it('GET /users should list ALL users and associated projects and pledges', function (done) {
    chai.request(app)
      .get('/users')
      .end(function (err, res) {
        let input = res.body
        // console.log(util.inspect(input, false, null))
        let actual = [{
            id: 1,
            name: 'Howie',
            password: null,
            email: 'howieburger@gmail.com',
            bank: '5000.00',
            projects: [{
                id: 1,
                name: 'Chariot',
                description: 'TV series where horses ride humans.',
                target_amount: 6000,
                user_id: 1
              },
              {
                id: 2,
                name: 'Fubar',
                description: 'Hair salon which does the exact opposite of what you ask for.',
                target_amount: 4000,
                user_id: 1
              }
            ],
            pledges: [{
              id: 3,
              amount: 300,
              comment: 'Go Hela',
              user_id: 1,
              project_id: 2
            }]
          },
          {
            id: 2,
            name: 'Hela',
            password: null,
            email: 'helabadga@gmail.com',
            bank: '5000.00',
            projects: [{
                id: 3,
                name: 'Snaptop',
                description: 'Laptop which snaps shut randomly five times a day.',
                target_amount: 3000,
                user_id: 2
              },
              {
                id: 4,
                name: 'Burger',
                description: 'I am hungry please fund my burger supply for a year.',
                target_amount: 4000,
                user_id: 2
              }
            ],
            pledges: [{
                id: 1,
                amount: 100,
                comment: 'Go Howie',
                user_id: 2,
                project_id: 1
              },
              {
                id: 5,
                amount: 500,
                comment: 'Early bird gets the prize',
                user_id: 2,
                project_id: 5
              }
            ]
          },
          {
            id: 3,
            name: 'Felix',
            password: null,
            email: 'ilovecroissants@gmail.com',
            bank: '5000.00',
            projects: [{
              id: 5,
              name: 'Meth Lab',
              description: 'Please support me in my future career. Early backers will receive a 10% discount on the best Ice in town.',
              target_amount: 10000,
              user_id: 3
            }],
            pledges: [{
              id: 2,
              amount: 1000,
              comment: 'I love horses',
              user_id: 3,
              project_id: 1
            }]
          },
          {
            id: 4,
            name: 'Joseph',
            password: null,
            email: 'joseph@gmail.com',
            bank: '5000.00',
            projects: [{
                id: 6,
                name: 'Mandarin Peeler',
                description: 'Are you sick and tired of having to manually peel mandarins. With Mandarin Peeler, you can mail us your mandarins and we will ship them back peeled and tasty with a 7 day shipping guarantee.',
                target_amount: 5000,
                user_id: 4
              },
              {
                id: 7,
                name: 'Moustache Moistener',
                description: 'For the man who suffers from dry moustache syndrome.',
                target_amount: 7000,
                user_id: 4
              }
            ],
            pledges: [{
              id: 4,
              amount: 300,
              comment: 'Yum burgers',
              user_id: 4,
              project_id: 4
            }]
          }
        ]
        expect(input).to.eql(actual)
        done();
      });
  });

  it('GET /users/:id should list a SINGLE user and associated projects and pledges', function (done) {
    chai.request(app)
      .get('/users/2')
      .end(function (err, res) {
        let input = res.body
        let actual = [{
          id: 2,
          name: 'Hela',
          password: null,
          email: 'helabadga@gmail.com',
          bank: '5000.00',
          projects:
            [{
              id: 3,
              name: 'Snaptop',
              description: 'Laptop which snaps shut randomly five times a day.',
              target_amount: 3000,
              user_id: 2
            },
            {
              id: 4,
              name: 'Burger',
              description: 'I am hungry please fund my burger supply for a year.',
              target_amount: 4000,
              user_id: 2
            }],
          pledges:
            [{
              id: 1,
              amount: 100,
              comment: 'Go Howie',
              user_id: 2,
              project_id: 1
            },
            {
              id: 5,
              amount: 500,
              comment: 'Early bird gets the prize',
              user_id: 2,
              project_id: 5
            }],
          pledgestotal: '600.00',
          projectstotal: '7000.00'
        }]
        // console.log(util.inspect(input, false, null))
        expect(input).to.eql(actual)
        done();
      });
  });


});