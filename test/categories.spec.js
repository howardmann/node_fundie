// Testing dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let expect = chai.expect;
chai.use(chaiHttp);

let util = require('util')

// App dependencies
let app = require('../server.js');
let knex = require('../db/knex');


describe('#Category', function () {
  // Before each test we rollback the migrations and run the seed file again
  let reset = function (done) {
    knex.migrate.rollback()
      .then(() => knex.migrate.latest())
      .then(() => knex.seed.run())
      .then(() => done())
  }

  beforeEach(reset);
  afterEach(reset);

  it('GET /categories should list ALL categories', function (done) {
    chai.request(app)
      .get('/categories')
      .end(function (err, res) {
        let input = res.body
        let actual = [{
            id: 1,
            name: 'art'
          },
          {
            id: 2,
            name: 'comics'
          },
          {
            id: 3,
            name: 'crafts'
          },
          {
            id: 4,
            name: 'dance'
          },
          {
            id: 5,
            name: 'design'
          },
          {
            id: 6,
            name: 'fashion'
          },
          {
            id: 7,
            name: 'film'
          },
          {
            id: 8,
            name: 'food'
          },
          {
            id: 9,
            name: 'games'
          },
          {
            id: 10,
            name: 'journalism'
          },
          {
            id: 11,
            name: 'music'
          },
          {
            id: 12,
            name: 'photography'
          },
          {
            id: 13,
            name: 'publishing'
          },
          {
            id: 14,
            name: 'technology'
          },
          {
            id: 15,
            name: 'theatre'
          },
          {
            id: 16,
            name: 'other'
          }
        ]
        // console.log(util.inspect(input, false, null))
        expect(input).to.eql(actual)
        done();
      });
  });
  it('GET /categories/:id should list a SINGLE category', function (done) {
    chai.request(app)
      .get('/categories/8')
      .end(function (err, res) {
        let input = res.body
        // console.log(util.inspect(input, false, null))
        let actual = {
          id: 8,
          name: 'food',
          projects:
            [{ id: 4, name: 'Burger' },
            { id: 5, name: 'Meth Lab' },
            { id: 6, name: 'Mandarin Peeler' }],
          projectCount: 3
        }
        expect(input).to.eql(actual)
        done();
      });
  });
  it('POST /categories/:id should create a SINGLE category', function (done) {
    chai.request(app)
      .post('/categories')
      .send({
        name: 'box office poison'
      })
      .end(function (err, res) {
        let input = res.body
        let actual = {
          id: 18,
          name: 'box office poison'
        }
        // console.log(util.inspect(input, false, null))
        expect(input).to.eql(actual)

        chai.request(app)
          .get('/categories')
          .end(function (err, res) {
            let input = res.body
            expect(input).to.deep.include(actual)
            // console.log(util.inspect(input, false, null))
            done()
          })
      });
  });
  it('PUT /categories/:id should update a SINGLE category', function (done) {
    chai.request(app)
      .put('/categories/1')
      .send({
        name: 'farty art'
      })
      .end(function (err, res) {
        let input = res.body
        let actual = {
          id: 1,
          name: 'farty art'
        }
        // console.log(util.inspect(input, false, null))
        expect(input).to.eql(actual)
        done();
      });
  });
  it('DELETE /categories/:id should delete a category', (done) => {
    chai.request(app)
      .delete('/categories/1')
      .end(function (err, res) {
        let input = res.body[0].id
        let actual = 1
        expect(input).to.equal(actual)
        chai.request(app)
          .get('/categories')
          .end(function (err, res) {
            let input = res.body.map(project => project.id)
            expect(input).to.not.include(actual)
            done()
          })
      })
  })
});