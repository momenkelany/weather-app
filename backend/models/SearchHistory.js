const mongoose = require('mongoose');

const searchHistorySchema = new mongoose.Schema(
  {
    city: {
      type: String,
      required: true
    },
    weatherData: {
      type: Object,
      required: true
    }
  },
  { timestamps: true } // ✅ Adds createdAt & updatedAt
);

module.exports = mongoose.model('SearchHistory', searchHistorySchema);
