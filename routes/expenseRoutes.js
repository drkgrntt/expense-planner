const Expense = require('../models/Expense');

module.exports = app => {
  // INDEX EXPENSE ROUTE
  app.get('/api/expenses', async (req, res) => {
    const expenses = await Expense.find({ 'owner.id': req.user._id }).sort({ created: -1 });

    res.send(expenses);
  });

  // FETCH EXPENSE ROUTE
  app.get('/api/expenses/:id', async (req, res) => {
    const expense = await Expense.findById(req.params.id);

    res.send(expense);
  });

  // CREATE EXPENSE ROUTE
  app.post('/api/expenses', (req, res) => {
    const { title, total, items } = req.body;
    const expense = new Expense({
      title,
      total,
      items,
      owner: {
        id: req.user._id,
        email: req.user.email
      }
    });

    expense.save((err, expense) => {
      if (err) {
        return res.send(err);
      }

      return res.send({ message: "Expense successfully created", expense });
    });
  });

  // UPDATE EXPENSE ROUTE
  app.put('/api/expenses/:id', async (req, res) => {
    const updatedExpense = await Expense.findByIdAndUpdate(req.params.id, req.body, {new: true});

    updatedExpense.save((err, expense) => {
      if (err) {
        return res.send(err);
      }

      return res.send({ message: "Expense successfully updated", expense });
    });
  });

  // DELETE EXPENSE ROUTE
  app.delete('/api/expenses/:id', async (req, res) => {
    const deletedExpense = await Expense.findByIdAndRemove(req.params.id);
    
    res.send({ message: 'Expense successfully deleted', deletedExpense });
  });

  // DELETE ALL EXPENSES AFTER VACATION IS FINALIZED
  app.delete('/api/expenses', async (req, res) => {
    const deletedExpenses = await Expense.find().remove();

    res.send({ message: 'All expenses successfully deleted', deletedExpenses });
  });
};
