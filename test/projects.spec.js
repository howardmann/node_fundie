// Testing dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let expect = chai.expect;
chai.use(chaiHttp);

let util = require('util')

// App dependencies
let app = require('../server.js');
let knex = require('../db/knex');


describe.only('#Users', function () {
  // Before each test we rollback the migrations and run the seed file again
  let reset = function (done) {
    knex.migrate.rollback()
      .then(() => knex.migrate.latest())
      .then(() => knex.seed.run())
      .then(() => done())
  }

  beforeEach(reset);
  afterEach(reset);

  it.only('GET /projects should list ALL projects and associated pledges, categories and computed properties', function (done) {
    chai.request(app)
      .get('/projects')
      .end(function (err, res) {
        let input = res.body
        let actual = [{
            id: 1,
            name: 'Chariot',
            description: 'TV series where horses ride humans.',
            target_amount: '6000.00',
            user_id: 1,
            pledges: [{
                id: 1,
                amount: '100.00',
                comment: 'Go Howie',
                user_id: 2,
                project_id: 1
              },
              {
                id: 2,
                amount: '1000.00',
                comment: 'I love horses',
                user_id: 3,
                project_id: 1
              }
            ],
            categories: [{
              id: 1,
              name: 'art'
            }, {
              id: 7,
              name: 'film'
            }],
            pledgesTotal: 1100,
            shortfall: 4900
          },
          {
            id: 2,
            name: 'Fubar',
            description: 'Hair salon which does the exact opposite of what you ask for.',
            target_amount: '4000.00',
            user_id: 1,
            pledges: [{
              id: 3,
              amount: '300.00',
              comment: 'Go Hela',
              user_id: 1,
              project_id: 2
            }],
            categories: [{
              id: 2,
              name: 'comics'
            }],
            pledgesTotal: 300,
            shortfall: 3700
          },
          {
            id: 3,
            name: 'Snaptop',
            description: 'Laptop which snaps shut randomly five times a day.',
            target_amount: '3000.00',
            user_id: 2,
            pledges: [],
            categories: [{
              id: 3,
              name: 'crafts'
            }],
            pledgesTotal: 0,
            shortfall: 3000
          },
          {
            id: 4,
            name: 'Burger',
            description: 'I am hungry please fund my burger supply for a year.',
            target_amount: '4000.00',
            user_id: 2,
            pledges: [{
              id: 4,
              amount: '300.00',
              comment: 'Yum burgers',
              user_id: 4,
              project_id: 4
            }],
            categories: [{
              id: 8,
              name: 'food'
            }],
            pledgesTotal: 300,
            shortfall: 3700
          },
          {
            id: 5,
            name: 'Meth Lab',
            description: 'Please support me in my future career. Early backers will receive a 10% discount on the best Ice in town.',
            target_amount: '10000.00',
            user_id: 3,
            pledges: [{
              id: 5,
              amount: '500.00',
              comment: 'Early bird gets the prize',
              user_id: 2,
              project_id: 5
            }],
            categories: [{
              id: 8,
              name: 'food'
            }, {
              id: 14,
              name: 'technology'
            }],
            pledgesTotal: 500,
            shortfall: 9500
          },
          {
            id: 6,
            name: 'Mandarin Peeler',
            description: 'Are you sick and tired of having to manually peel mandarins. With Mandarin Peeler, you can mail us your mandarins and we will ship them back peeled and tasty with a 7 day shipping guarantee.',
            target_amount: '5000.00',
            user_id: 4,
            pledges: [],
            categories: [{
              id: 8,
              name: 'food'
            }],
            pledgesTotal: 0,
            shortfall: 5000
          },
          {
            id: 7,
            name: 'Moustache Moistener',
            description: 'For the man who suffers from dry moustache syndrome.',
            target_amount: '7000.00',
            user_id: 4,
            pledges: [],
            categories: [{
              id: 6,
              name: 'fashion'
            }],
            pledgesTotal: 0,
            shortfall: 7000
          }
        ]
        // console.log(util.inspect(input, false, null))
        expect(input).to.eql(actual)
        done();
      });
  });


});