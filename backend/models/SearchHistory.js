const mongoose = require('mongoose');

const searchHistorySchema = new mongoose.Schema({
  city: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  weatherData: {
    type: Object,
    required: true
  }
});

module.exports = mongoose.model('SearchHistory', searchHistorySchema); 