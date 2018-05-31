const Collection = require('../models/Collection');
const Expense = require('../models/Expense');

module.exports = app => {
  // INDEX EXPENSE COLLECTIONS ROUTE
  app.get('/api/collections', async (req, res) => {
    const collections = await Collection.find().sort({ created: -1 });

    res.send(collections);
  });

  // FETCH ONE COLLECTION ROUTE
  app.get('/api/collections/:id', async (req, res) => {
    const collection = await Collection.findById(req.params.id);

    res.send(collection);
  });

  // CREATE A COLLECTION ROUTE
  app.post('/api/collections', (req, res) => {
    const { total, expenses, dateRange } = req.body;
    const collection = new Collection({ total, expenses, dateRange });

    collection.save();
    res.send(collection);
  });
};
