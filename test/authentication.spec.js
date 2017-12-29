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
              // console.log(util.inspect(res.body, false, null))
              let emailArr = res.body.map(user => user.email)
              expect(emailArr).to.include('new@gmail.com')
              done();
            })
        });
    });
  })

  describe('POST /login', function(){
    beforeEach(function(done){
      chai.request(app)
        .post('/signup')
        .send({
          email: 'chicken@gmail.com',
          name: 'chickenman',
          password: 'chicken'
        })
        .then(function(err, res){
          done()
        })
    })

    it('should validate and redirect to / when username and password both match', function (done) {
      chai.request(app)
        .post('/login')
        .send({
          email: 'chicken@gmail.com',
          password: 'chicken'
        })
        .end(function (err, res) {
          let input = res.body.url
          let actual = '/'
          expect(input).to.equal(actual)
          done();
        });
    });    
    it('should validate and redirect to /fail when username and password dont match', function (done) {
      chai.request(app)
        .post('/login')
        .send({
          email: 'chicken@gmail.com',
          password: 'bad password'
        })
        .end(function (err, res) {
          let input = res.body.url
          let actual = '/fail'
          expect(input).to.equal(actual)
          done();
        });
    });    
  })
});