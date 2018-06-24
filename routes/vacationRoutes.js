const Vacation = require('../models/Vacation');

module.exports = app => {
  // INDEX EXPENSE VACATIONS ROUTE
  app.get('/api/vacations', async (req, res) => {
    const vacations = await Vacation.find({ 'owner.id': req.user._id }).sort({ created: -1 });

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
    const vacation = new Vacation({ 
      title, 
      description, 
      total, 
      expenses, 
      dateRange,
      owner: {
        id: req.user._id,
        email: req.user.email
      }
    });

    vacation.save((err, vacation) => {
      if (err) {
        return res.send(err);
      }

      return res.send({ message: "Vacation successfully created", vacation });
    });
  });
};
