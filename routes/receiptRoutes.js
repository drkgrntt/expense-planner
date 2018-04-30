const _ = require('lodash');
const Receipt = require('../models/Receipt');

module.exports = app => {
  // INDEX RECEIPT ROUTE
  app.get('/api/receipts', async (req, res) => {
    const receipts = await Receipt.find().sort({ created: -1 });

    res.send(receipts);
  });

  // FETCH RECEIPT ROUTE
  app.get('/api/receipts/:id', async (req, res) => {
    const receipt = await Receipt.findById(req.params.id);

    res.send(receipt);
  });

  // CREATE RECEIPT ROUTE
  app.post('/api/receipts', (req, res) => {
    const { total, items } = req.body;
    const receipt = new Receipt({ total, items });

    receipt.save();
    res.send(receipt);
  });

  // UPDATE RECEIPT ROUTE
  app.put('/api/receipts/:id', async (req, res) => {
    const updatedReceipt = await Receipt.findByIdAndUpdate(req.params.id, req.body);

    res.send(updatedReceipt);
  });

  // DELETE RECEIPT ROUTE
  app.delete('/api/receipts/:id', async (req, res) => {
    const deleteReceipt = await Receipt.findByIdAndRemove(req.params.id);

    res.send(deleteReceipt);
  });

  // DELETE ALL RECEIPTS AFTER COLLECTION IS FINALIZED
  app.delete('/api/receipts', async (req, res) => {
    const deleteReceipts = await Receipt.find().remove();

    res.send(deleteReceipts);
  });
};
