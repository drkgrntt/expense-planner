const Vacation = require('../models/Vacation');
const Expense = require('../models/Expense');

module.exports = app => {
  // INDEX EXPENSE VACATIONS ROUTE
  app.get('/api/vacations', async (req, res) => {
    const vacations = await Vacation.find().sort({ created: -1 });

    res.send(vacations);
  });

  // FETCH ONE VACATION ROUTE
  app.get('/api/vacations/:id', async (req, res) => {
    const vacation = await Vacation.findById(req.params.id);

    res.send(vacation);
  });

  // CREATE A VACATION ROUTE
  app.post('/api/vacations', (req, res) => {
    const { title, description, total, expenses, dateRange } = req.body;
    const vacation = new Vacation({ title, description, total, expenses, dateRange });

    vacation.save();
    res.send(vacation);
  });
};
