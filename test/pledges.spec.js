// Testing dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let expect = chai.expect;
chai.use(chaiHttp);

let util = require('util')

// App dependencies
let app = require('../server.js');
let knex = require('../db/knex');


describe('#Pledges', function () {
  // Before each test we rollback the migrations and run the seed file again
  let reset = function (done) {
    knex.migrate.rollback()
      .then(() => knex.migrate.latest())
      .then(() => knex.seed.run())
      .then(() => done())
  }

  beforeEach(reset);
  afterEach(reset);

  it('GET /pledges should list ALL pledges and belongs_to user and project', function (done) {
    chai.request(app)
      .get('/pledges')
      .end(function (err, res) {
        let input = res.body
        // console.log(util.inspect(input, false, null))
        let actual = [{
            id: 1,
            amount: '100.00',
            comment: 'Go Howie',
            user: {
              name: 'Hela'
            },
            project: {
              name: 'Chariot'
            }
          },
          {
            id: 2,
            amount: '1000.00',
            comment: 'I love horses',
            user: {
              name: 'Felix'
            },
            project: {
              name: 'Chariot'
            }
          },
          {
            id: 3,
            amount: '300.00',
            comment: 'Go Hela',
            user: {
              name: 'Howie'
            },
            project: {
              name: 'Fubar'
            }
          },
          {
            id: 4,
            amount: '300.00',
            comment: 'Yum burgers',
            user: {
              name: 'Joseph'
            },
            project: {
              name: 'Burger'
            }
          },
          {
            id: 5,
            amount: '500.00',
            comment: 'Early bird gets the prize',
            user: {
              name: 'Hela'
            },
            project: {
              name: 'Meth Lab'
            }
          }
        ]
        expect(input).to.eql(actual)
        done();
      });
  });
  it('GET /pledges/:id should list a SINGLE pledge and belongs_to user and project', function (done) {
    chai.request(app)
      .get('/pledges/1')
      .end(function (err, res) {
        let input = res.body
        // console.log(util.inspect(input, false, null))
        let actual = {
          id: 1,
          amount: '100.00',
          comment: 'Go Howie',
          user: { name: 'Hela' },
          project: { name: 'Chariot' }
        }
        expect(input).to.eql(actual)
        done();
      });
  });
  it('POST /pledges/:id should create a SINGLE pledge and attach associated user and project', function (done) {
    chai.request(app)
      .post('/pledges')
      .send({
        amount: 200,
        comment: 'I love chariot games',
        user_id: 2,
        project_id: 1
      })
      .end(function (err, res) {
        let input = res.body
        let actual = {
          comment: 'I love chariot games',
          amount: 200,
          user_id: 2,
          project_id: 1,
          id: 6
        }
        // console.log(util.inspect(input, false, null))
        expect(input).to.eql(actual)
        
        chai.request(app)
          .get('/projects/1')
          .end(function(err, res){
            let pledges = res.body.pledges
            let input = pledges.map(pledge => pledge.comment)
            expect(input).includes(actual.comment)
            // console.log(util.inspect(input, false, null))
            done()
          })
      });
  });
  it('PUT /pledges/:id should update a SINGLE pledge', function (done) {
    chai.request(app)
      .put('/pledges/1')
      .send({
        amount: 0,
        comment: 'no money mate'
      })
      .end(function (err, res) {
        let input = res.body
        let actual = {
          comment: 'no money mate',
          amount: '0.00',
          id: 1,
          user_id: 2,
          project_id: 1
        }
        // console.log(util.inspect(input, false, null))
        expect(input).to.eql(actual)
        done();
      });
  });
  it('DELETE /pledges/:id should delete a pledge', (done) => {
    chai.request(app)
      .delete('/pledges/1')
      .end(function (err, res) {
        let input = res.body[0].id
        let actual = 1
        expect(input).to.equal(actual)
        chai.request(app)
          .get('/pledges')
          .end(function (err, res) {
            let input = res.body.map(project => project.id)
            expect(input).to.not.include(actual)
            done()
          })
      })
  })
});