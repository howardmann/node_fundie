// Testing dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let expect = chai.expect;
chai.use(chaiHttp);

let util = require('util')

// App dependencies
let app = require('../server.js');
let knex = require('../db/knex');

describe('#Champions', function () {
  // Before each test we rollback the migrations and run the seed file again
  let reset = function (done) {
    knex.migrate.rollback()
      .then(() => knex.migrate.latest())
      .then(() => knex.seed.run())
      .then(() => done())
  }

  beforeEach(reset);
  afterEach(reset);

  it('GET /champions should list ALL champions and associated planets', function (done) {
    chai.request(app)
      .get('/champions')
      .end(function (err, res) {
        let input = res.body
        let actual = [{ id: 1, name: 'Sarah Kerrigan', race_id: 1 },
        { id: 2, name: 'Artanis', race_id: 2 },
        { id: 3, name: 'Jim Raynor', race_id: 3 },
        { id: 4, name: 'Amon', race_id: 4 }]
        expect(input).to.eql(actual)
        done();
      });
  });

  it('POST /champions should CREATE a new champion with relevant associations', function (done) {
    let howie = {
      name: 'Howie Mann',
      race_id: 2
    }
    chai.request(app)
      .post('/champions')
      .send(howie)
      .end(function (err, res) {
        let input = res.body
        let actual = { id: 5, name: 'Howie Mann', race_id: 2 }        
        expect(input).to.eql(actual)
        done();
      });
  });



});