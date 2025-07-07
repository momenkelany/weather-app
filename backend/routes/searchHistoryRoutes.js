const express = require('express');
const router = express.Router();
const SearchHistory = require('../models/SearchHistory');

// Get search history
router.get('/', async (req, res) => {
  try {
    // Get only the latest record for each city using MongoDB aggregation
    const history = await SearchHistory.aggregate([
      {
        $sort: { timestamp: -1 }
      },
      {
        $group: {
          _id: '$city',
          doc: { $first: '$$ROOT' }
        }
      },
      {
        $replaceRoot: { newRoot: '$doc' }
      }
    ]);
    res.json(history);
  } catch (error) {
    console.error('Error fetching history:', error);
    res.status(500).json({ message: 'Error fetching search history' });
  }
});

// Clear search history
router.delete('/', async (req, res) => {
  try {
    await SearchHistory.deleteMany({});
    res.json({ message: 'Search history cleared' });
  } catch (error) {
    console.error('Error clearing history:', error);
    res.status(500).json({ message: 'Error clearing search history' });
  }
});

module.exports = router;
