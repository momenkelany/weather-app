const axios = require('axios');
const SearchHistory = require('../models/SearchHistory');

const getWeatherByCity = async (req, res) => {
  try {
    const { city } = req.params;
    const apiKey = process.env.OPENWEATHER_API_KEY;
    
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );

    const weatherData = response.data;

    // Save to search history
    try {
      await SearchHistory.create({
        city,
        weatherData
      });
    } catch (dbError) {
      console.error('Error saving to history:', dbError);
      // Continue even if saving to history fails
    }

    res.json(weatherData);
  } catch (error) {
    console.error('Error fetching weather:', error);
    
    // Handle OpenWeather API specific errors
    if (error.response) {
      const status = error.response.status;
      if (status === 404) {
        return res.status(404).json({ message: 'City not found' });
      } else if (status === 401) {
        return res.status(401).json({ message: 'Invalid API key' });
      }
    }
    
    res.status(500).json({ message: 'Error fetching weather data' });
  }
};

const getWeatherByCoordinates = async (req, res) => {
  try {
    const { lat, lon } = req.query;
    
    if (!lat || !lon) {
      return res.status(400).json({ message: 'Latitude and longitude are required' });
    }
    
    const apiKey = process.env.OPENWEATHER_API_KEY;
    
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
    );

    const weatherData = response.data;

    // Save to search history with city name from the response
    try {
      await SearchHistory.create({
        city: weatherData.name,
        weatherData
      });
    } catch (dbError) {
      console.error('Error saving to history:', dbError);
      // Continue even if saving to history fails
    }

    res.json(weatherData);
  } catch (error) {
    console.error('Error fetching weather by coordinates:', error);
    
    // Handle OpenWeather API specific errors
    if (error.response) {
      const status = error.response.status;
      if (status === 404) {
        return res.status(404).json({ message: 'Location not found' });
      } else if (status === 401) {
        return res.status(401).json({ message: 'Invalid API key' });
      }
    }
    
    res.status(500).json({ message: 'Error fetching weather data for coordinates' });
  }
};

const getForecast = async (req, res) => {
  try {
    const { city } = req.params;
    const apiKey = process.env.OPENWEATHER_API_KEY;
    
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
    );

    res.json(response.data);
  } catch (error) {
    console.error('Error fetching forecast:', error);
    
    // Handle OpenWeather API specific errors
    if (error.response) {
      const status = error.response.status;
      if (status === 404) {
        return res.status(404).json({ message: 'City not found' });
      } else if (status === 401) {
        return res.status(401).json({ message: 'Invalid API key' });
      }
    }
    
    res.status(500).json({ message: 'Error fetching forecast data' });
  }
};

module.exports = {
  getWeatherByCity,
  getWeatherByCoordinates,
  getForecast
};

