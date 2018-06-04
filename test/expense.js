// https://scotch.io/tutorials/test-a-node-restful-api-with-mocha-and-chai

process.env.NODE_ENV = 'test';

// Server and database stuff
const mongoose = require('mongoose');
const Expense = require('../models/Expense');
const app = require('../app');

// dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();

chai.use(chaiHttp);

// Parent block
describe('Expenses', () => {
  // Empty the database before each test
  beforeEach(done => {
    Expense.remove({}, err => {
      done();
    });
  });

  // Test GET route for all expenses
  describe('/GET expenses', () => {
    it('should GET all the expenses', done => {
      chai.request(app)
        .get('/api/expenses')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(0);
        done();
      });
    });
  });

  // Test POST route
  describe('/POST expense', () => {
    // Error test
    it('should not POST an expense if there is no title', done => {
      let expense = new Expense({
        total: 100,
        items: [{
          category: "Food",
          cost: 100,
          description: "Food for the trip"
        }]
      });

      chai.request(app)
        .post('/api/expenses')
        .send(expense)
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
    it('should POST an expense', done => {
      let expense = new Expense({
        title: "Trip",
        total: 100,
        items: [{ 
          category: "Food", 
          cost: 100, 
          description: "Food for the trip" 
        }]
      });

      chai.request(app)
        .post('/api/expenses')
        .send(expense)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Expense successfully created');
          res.body.expense.should.have.property('total');
          res.body.expense.should.have.property('items');
        done();
      });
    });
  });

  // Test GET route for one expense
  describe('/GET/:id expense', () => {
    it('should GET an expense by the given id', done => {
      let expense = new Expense({
        title: "Trip",
        total: 100,
        items: [{
          category: "Food",
          cost: 100,
          description: "Food for the trip"
        }]
      });

      expense.save((err, expense) => {
        chai.request(app)
          .get(`/api/expenses/${expense.id}`)
          .send(expense)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('total');
            res.body.should.have.property('items');
            res.body.should.have.property('_id').eql(expense.id);
          done();
        });
      });
    });
  });

  // Test the /PUT/:id route
  describe('/PUT/:id expense', () => {
    it('should UPDATE an expense given the id', done => {
      let expense = new Expense({
        title: "Trip",
        total: 100,
        items: [{
          category: "Food",
          cost: 100,
          description: "Food for the trip"
        }]
      });

      expense.save((err, expense) => {
        let editedExpense = {
          title: "Trip",
          total: 150,
          items: [
            {
              category: "Food",
              cost: 100,
              description: "Food for the trip"
            },
            {
              category: "Gas",
              cost: 50,
              description: "Gas for the trip"
            }
          ]
        }

        chai.request(app)
          .put(`/api/expenses/${expense.id}`)
          .send(editedExpense)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('Expense successfully updated');
            res.body.expense.should.have.property('total').eql(150);
          done();
        });
      });
    });
  });

  // Test the /DELETE/:id route
  describe('/DELETE/:id expense', () => {
    it('should DELETE an expense given the id', done => {
      let expense = new Expense({
        title: "Foodsies",
        total: 100,
        items: [{
          category: "Food",
          cost: 100,
          description: "Food for the trip"
        }]
      });

      expense.save((err, expense) => {
        chai.request(app)
          .delete(`/api/expenses/${expense.id}`)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('Expense successfully deleted');
            res.body.deletedExpense.should.have.property('_id').eql(expense.id);
          done();
        });
      });
    });
  });

  // Test the /DELETE route for all expenses
  describe('/DELETE expenses', () => {
    it('should DELETE all expenses', done => {
      let expense = new Expense({
        title: "Trip",
        total: 100,
        items: [{
          category: "Food",
          cost: 100,
          description: "Food for the trip"
        }]
      });

      expense.save((err, expense) => {
        chai.request(app)
          .delete('/api/expenses')
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('All expenses successfully deleted');
            res.body.deletedExpenses.should.have.property('ok').eql(1);
            res.body.deletedExpenses.should.have.property('n').eql(1);
          done();
        });
      });
    });
  });
});
