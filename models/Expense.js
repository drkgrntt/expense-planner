const mongoose = require('mongoose');
const { Schema } = mongoose;

const date = new Date();
const dateString = date.toDateString();

const expenseSchema = new Schema({
  title: { type: String, required: true },
  total: { type: Number, required: true },
  items: { 
    type: [
      {
        category: { type: String, required: true },
        cost: { type: Number, required: true },
        description: String
      }
    ], 
    required: true 
  },
  created: { type: Date, default: Date.now },
  dateString: { type: String, default: dateString }
},
{
  usePushEach: true
});

module.exports = mongoose.model('expense', expenseSchema);
