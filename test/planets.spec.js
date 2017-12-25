// Testing dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let expect = chai.expect;
chai.use(chaiHttp);

let util = require('util')

// App dependencies
let app = require('../server.js');
let knex = require('../db/knex');

describe('#Planets', function () {
  // Before each test we rollback the migrations and run the seed file again
  let reset = function (done) {
    knex.migrate.rollback()
      .then(() => knex.migrate.latest())
      .then(() => knex.seed.run())
      .then(() => done())
  }

  beforeEach(reset);
  afterEach(reset);

  it('GET /planets should list ALL planets and associated races and champions', function (done) {
    chai.request(app)
      .get('/planets')
      .end(function (err, res) {
        let input = res.body
        let actual = [
          {
            id: 1,
            name: "Korhal",
            races: [
              "Terran"
            ],
            champions: [
              "Jim Raynor"
            ]
          },
          {
            id: 2,
            name: "Char",
            races: [
              "Zerg"
            ],
            champions: [
              "Sarah Kerrigan"
            ]
          },
          {
            id: 3,
            name: "Aiur",
            races: [
              "Protoss",
              "Zerg"
            ],
            champions: [
              "Artanis",
              "Sarah Kerrigan"
            ]
          }
        ]
        expect(input).to.eql(actual)
        done();
      });
  });

  it('GET /planet/:id should list a SINGLE planets and associated races and champions', function (done) {
    chai.request(app)
      .get('/planets/3')
      .end(function (err, res) {
        let input = res.body
        let actual = [
          {
            id: 3,
            name: "Aiur",
            races: [
              "Zerg",
              "Protoss"
            ],
            champions: [
              "Sarah Kerrigan",
              "Artanis"
            ]
          }
        ]
        expect(input).to.eql(actual)
        done();
      });
  });

  it('POST /planets should CREATE a new planet', function (done) {
    chai.request(app)
      .post('/planets')
      .send({ name: 'Earth' })
      .end(function (err, res) {
        let input = res.body
        let actual = { id: 5, name: 'Earth' }
        expect(input).to.eql(actual)
        done();
      });
  });

});