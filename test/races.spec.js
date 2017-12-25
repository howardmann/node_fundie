// Testing dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let expect = chai.expect;
chai.use(chaiHttp);

let util = require('util')
let _ = require('lodash')

// App dependencies
let app = require('../server.js');
let knex = require('../db/knex');

describe('#Races', function () {
  // Before each test we rollback the migrations and run the seed file again
  let reset = function (done) {
    knex.migrate.rollback()
      .then(() => knex.migrate.latest())
      .then(() => knex.seed.run())
      .then(() => done())
  }

  beforeEach(reset);
  afterEach(reset);

  it('GET /races should list ALL races and associated planets', function (done) {
    chai.request(app)
      .get('/races')
      .end(function (err, res) {
        let input = _.sortBy(res.body,'name')
        let data = [
          {
            name: "Zerg",
            planets: [
              "Char",
              "Aiur"
            ]
          },
          {
            name: "Xel Naga",
            planets: [
              null
            ]
          },
          {
            name: "Protoss",
            planets: [
              "Aiur"
            ]
          },
          {
            name: "Terran",
            planets: [
              "Korhal"
            ]
          }
        ]
        let actual = _.sortBy(data, 'name')
        expect(input).to.eql(actual)
        done();
      });
  });

  it('GET /races/:id should list SINGLE race with associated champions and planets', function (done) {
    chai.request(app)
      .get('/races/1')
      .end(function (err, res) {
        let input = res.body
        let actual = [{
          id: 1,
          name: 'Zerg',
          planets: ['Char', 'Aiur'],
          affiliation: 'Evil',
          champions: ['Sarah Kerrigan']
        }]
        // console.log(util.inspect(input, false, null))
        expect(input).to.eql(actual)
        done();
      });
  });

  it('POST /races should add a SINGLE race with associations planets', function (done) {
    chai.request(app)
      .post('/races')
      .send({
        name: 'Human',
        affiliation: 'Tasty',
        planet_id: [1]
      })
      .end(function (err, res) {
        let input = res.body
        let actual = [{
          id: 5,
          name: 'Human',
          planets: ['Korhal'],
          affiliation: 'Tasty',
          champions: [null]
        }]
        expect(input).to.eql(actual)
        done();
      });        
  })

  it('PUT /races/:id should update race and planet if given planet_id', function(done){
    chai.request(app)
      .put('/races/2')
      .send({
        name: 'Protosses!',
        planet_id: [1,2,3]
      })
      .end(function (err, res) {
        let input = res.body
        let actual = [{
          id: 2,
          name: 'Protosses!',
          planets: ['Korhal', 'Char', 'Aiur'],
          affiliation: 'Technology',
          champions: ['Artanis']
        }]
        expect(input).to.eql(actual)
        done();
      });    
  })

  it('PUT /races/:id should still update race and if planet_id is not given', function(done){
    chai.request(app)
      .put('/races/2')
      .send({
        name: 'Protosses Boom!'
      })
      .end(function (err, res) {
        let input = res.body
        let actual = [{
          id: 2,
          name: 'Protosses Boom!',
          planets: ['Aiur'],
          affiliation: 'Technology',
          champions: ['Artanis']
        }]
        expect(input).to.eql(actual)
        done();
      });    
  })

});