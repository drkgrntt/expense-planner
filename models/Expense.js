const mongoose = require('mongoose');
const { Schema } = mongoose;

const date = new Date();
const dateString = date.toDateString();

const expenseSchema = new Schema({
  total: Number,
  items: [
    {
      category: String,
      cost: Number,
      description: String
    }
  ],
  created: { type: Date, default: Date.now },
  dateString: { type: String, default: dateString }
},
{
  usePushEach: true
});

module.exports = mongoose.model('expense', expenseSchema);
