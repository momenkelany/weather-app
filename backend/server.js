const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: 'https://momenkelany.github.io', // Allow only your frontend
}));app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/weather-app')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    // Continue running the app even if MongoDB fails
  });

// Routes
const weatherRoutes = require('./routes/weatherRoutes');
const searchHistoryRoutes = require('./routes/searchHistoryRoutes');

app.use('/api/weather', weatherRoutes);
app.use('/api/history', searchHistoryRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});