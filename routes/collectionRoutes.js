const Collection = require('../models/Collection');
const Receipt = require('../models/Receipt');

module.exports = app => {
  // INDEX RECEIPT COLLECTIONS ROUTE
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
    const { total, receipts, dateRange } = req.body;
    const collection = new Collection({ total, receipts, dateRange });

    collection.save();
    res.send(collection);
  });
};
