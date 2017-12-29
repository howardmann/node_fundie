// Testing dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let expect = chai.expect;
chai.use(chaiHttp);

let util = require('util')

// App dependencies
let app = require('../server.js');
let knex = require('../db/knex');


describe('#Authentication', function () {
  // Before each test we rollback the migrations and run the seed file again
  let reset = function (done) {
    knex.migrate.rollback()
      .then(() => knex.migrate.latest())
      .then(() => knex.seed.run())
      .then(() => done())
  }

  beforeEach(reset);
  afterEach(reset);

  describe('POST /signup', function(){
    it('should validate if username exists', function (done) {
      chai.request(app)
        .post('/signup')
        .send({
          email: 'howieburger@gmail.com',
          name: 'howie',
          password: '123'
        })
        .end(function (err, res) {
          let input = res.body.url
          let actual = '/fail'
          expect(input).to.equal(actual)
          done();
        });
    });
    it('should create a new user if it doesnt exist', function (done) {
      chai.request(app)
        .post('/signup')
        .send({
          email: 'new@gmail.com',
          name: 'new guy',
          password: '123'
        })
        .end(function (err, res) {
          let input = res.body.url
          let actual = '/'
          // console.log(util.inspect(input, false, null))
          expect(input).to.eql(actual)
          chai.request(app)
            .get('/users')
            .end(function(err, res){
              let emailArr = res.body.map(user => user.email)
              expect(emailArr).to.include('new@gmail.com')
              done();
            })
        });
    });

  })
});