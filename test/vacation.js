process.env.NODE_ENV = 'test';

// Server and database stuff
const mongoose = require('mongoose');
const Vacation = require('../models/Vacation');
const app = require('../app');

// dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();

chai.use(chaiHttp);

// Parent block
describe('Vacations', () => {
  // Empty the database before each test
  beforeEach(done => {
    Vacation.remove({}, err => {
      done();
    });
  });

  // Test GET route for all vacations
  describe('/GET vacations', () => {
    it('should GET all the vacations', done => {
      chai.request(app)
        .get('/api/vacations')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(0);
        done();
      });
    });
  });
  
  // Test POST route
  describe('/POST vacation', () => {
    // Test error
    it('should not POST a vacation if there is no title', done => {
      let vacation = new Vacation({
        description: "A cruise in the Bahamas",
        total: 5000,
        expenses: [{
          title: "The Cruise",
          total: 5000,
          items: [{
            category: "An all inclusive cruise",
            cost: 5000,
            description: "This covered literally everything"
          }]
        }]
      });

      chai.request(app)
        .post('/api/vacations')
        .send(vacation)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('errors');
          res.body.errors.should.have.property('title');
          res.body.errors.title.should.have.property('kind').eql('required');
        done();
      });
    });

    // Correct post test
    it('should POST a vacation', done => {
      let vacation = new Vacation({
        title: "The Bahamas",
        description: "A cruise in the Bahamas",
        total: 5000,
        expenses: [{
          title: "The Cruise",
          total: 5000,
          items: [{
            category: "An all inclusive cruise",
            cost: 5000,
            description: "This covered literally everything"
          }]
        }]
      });

      chai.request(app)
        .post('/api/vacations')
        .send(vacation)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Vacation successfully created');
          res.body.vacation.should.have.property('title');
          res.body.vacation.should.have.property('total');
        done();
      });
    });
  });

  // Test GET route for one vacation
  describe('/GET/:id vacation', () => {
    it('should GET a vacation by the given id', done => {
      let vacation = new Vacation({
        title: "The Bahamas",
        description: "A cruise in the Bahamas",
        total: 5000,
        expenses: [{
          title: "The Cruise",
          total: 5000,
          items: [{
            category: "An all inclusive cruise",
            cost: 5000,
            description: "This covered literally everything"
          }]
        }]
      });

      vacation.save((err, vacation) => {
        chai.request(app)
          .get(`/api/vacations/${vacation.id}`)
          .send(vacation)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('title');
            res.body.should.have.property('total');
            res.body.should.have.property('expenses');
          done();
        });
      });
    });
  });
});
