const mongoose = require('mongoose');
const { Schema } = mongoose;

const vacationSchema = new Schema({
  total: Number,
  expenses: [
    {
      total: Number,
      items: [
        {
          category: String,
          cost: Number,
          description: String
        }
      ],
      created: Date,
      dateString: String
    }
  ],
  dateRange: String,
  created: { type: Date, default: Date.now }
},
{
  usePushEach: true
});

module.exports = mongoose.model('vacation', vacationSchema);
