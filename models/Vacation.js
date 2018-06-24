const mongoose = require('mongoose');
const { Schema } = mongoose;

const vacationSchema = new Schema({
  title: { type: String, required: true },
  description: String,
  total: { type: Number, required: true },
  expenses: { type: [
    {
      title: { type: String, required: true },
      total: { type: Number, required: true },
      items: { type: [
        {
          category: { type: String, required: true },
          cost: { type: Number, required: true },
          description: String,
          _id: { type: String, required: true }
        }
      ], required: true },
      created: Date,
      dateString: String
    }
  ], required: true },
  owner: {
    type: {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      email: String
    },
    required: true
  },
  dateRange: String,
  created: { type: Date, default: Date.now }
},
{
  usePushEach: true
});

module.exports = mongoose.model('vacation', vacationSchema);
