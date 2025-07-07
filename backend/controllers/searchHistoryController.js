const SearchHistory = require('../models/SearchHistory');

const getSearchHistory = async (req, res) => {
  try {
    const history = await SearchHistory.find()
      .sort({ createdAt: -1 }) // ✅ Sort by built-in timestamp
      .limit(10);
    res.json(history);
  } catch (error) {
    console.error('Error fetching search history:', error);
    res.status(500).json({ message: 'Error fetching search history' });
  }
};

const clearSearchHistory = async (req, res) => {
  try {
    await SearchHistory.deleteMany({});
    res.json({ message: 'Search history cleared successfully' });
  } catch (error) {
    console.error('Error clearing search history:', error);
    res.status(500).json({ message: 'Error clearing search history' });
  }
};

module.exports = {
  getSearchHistory,
  clearSearchHistory
};
