const _ = require('lodash');
const Expense = require('../models/Expense');

module.exports = app => {
  // INDEX EXPENSE ROUTE
  app.get('/api/expenses', async (req, res) => {
    const expenses = await Expense.find().sort({ created: -1 });

    res.send(expenses);
  });

  // FETCH EXPENSE ROUTE
  app.get('/api/expenses/:id', async (req, res) => {
    const expense = await Expense.findById(req.params.id);

    res.send(expense);
  });

  // CREATE EXPENSE ROUTE
  app.post('/api/expenses', (req, res) => {
    const { total, items } = req.body;
    const expense = new Expense({ total, items });

    expense.save();
    res.send(expense);
  });

  // UPDATE EXPENSE ROUTE
  app.put('/api/expense/:id', async (req, res) => {
    const updatedExpense = await Expense.findByIdAndUpdate(req.params.id, req.body);

    res.send(updatedExpense);
  });

  // DELETE EXPENSE ROUTE
  app.delete('/api/expenses/:id', async (req, res) => {
    const deleteExpense = await Expense.findByIdAndRemove(req.params.id);

    res.send(deleteExpense);
  });

  // DELETE ALL EXPENSES AFTER COLLECTION IS FINALIZED
  app.delete('/api/expenses', async (req, res) => {
    const deleteExpenses = await Expense.find().remove();

    res.send(deleteExpenses);
  });
};
