import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  CircularProgress,
  Box,
  Alert,
} from '@mui/material';
import WeatherCard from '../components/WeatherCard';
import SearchBox from '../components/SearchBox';

const Forecast = () => {
  const { city } = useParams();
  const navigate = useNavigate();
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      if (!city || city.trim().length === 0) {
        navigate('/');
        return;
      }

      try {
        setLoading(true);
        setError(null);
        setCurrentWeather(null);
        setForecast(null);

        // Fetch current weather from our backend
        const backendUrl = import.meta.env.VITE_BACKEND_URL;

const currentResponse = await fetch(
  `${backendUrl}/api/weather/city/${encodeURIComponent(city.trim())}`
);
       
        const currentData = await currentResponse.json();
        if (!currentResponse.ok) {
          throw new Error(currentData.message || 'City not found');
        }
        setCurrentWeather(currentData);

        // Fetch forecast from our backend
        const forecastResponse = await fetch(
  `${backendUrl}/api/weather/forecast/${encodeURIComponent(city.trim())}`
);
        const forecastData = await forecastResponse.json();
        if (!forecastResponse.ok) {
          throw new Error(forecastData.message || 'Failed to fetch forecast data');
        }
        setForecast(forecastData);

      } catch (err) {
        console.error('Error:', err);
        setError(err.message || 'Error fetching weather data. Please try again.');
        setCurrentWeather(null);
        setForecast(null);
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, [city, navigate]);

  const getFiveDayForecast = (forecastData) => {
    if (!forecastData || !forecastData.list) return [];
    
    // Group forecast data by date
    const dailyForecasts = {};
    
    forecastData.list.forEach(item => {
      const date = new Date(item.dt * 1000).toDateString();
      if (!dailyForecasts[date]) {
        dailyForecasts[date] = item;
      }
    });
    
    // Get the first 5 unique days
    return Object.values(dailyForecasts).slice(0, 5);
  };

  if (loading) {
    return (
      <Container maxWidth="lg">
        <SearchBox />
        <Box className="weather-loading">
          <CircularProgress size={60} sx={{ color: 'white' }} />
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg">
        <SearchBox />
        <Box sx={{ mt: 4 }}>
          <Alert 
            className="weather-error"
            severity="error" 
            variant="filled" 
            sx={{ 
              background: 'linear-gradient(135deg, rgba(244, 67, 54, 0.2) 0%, rgba(244, 67, 54, 0.1) 100%)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(244, 67, 54, 0.3)',
              borderRadius: '15px',
              color: '#ffcdd2'
            }}
          >
            {error.includes('https://') ? (
              <span>
                {error.split('https://')[0]}
                <a href={`https://${error.split('https://')[1]}`} target="_blank" rel="noopener noreferrer">
                  Click here for more information
                </a>
              </span>
            ) : error}
          </Alert>
        </Box>
      </Container>
    );
  }

  const fiveDayForecast = forecast ? getFiveDayForecast(forecast) : [];

  return (
    <Container maxWidth="lg">
      <SearchBox />
      
      {currentWeather && (
        <Box sx={{ my: 4 }}>
          <Typography 
            variant="h4" 
            gutterBottom 
            sx={{ 
              color: 'white', 
              fontWeight: 700, 
              textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
              textAlign: 'center',
              mb: 3
            }}
          >
            Current Weather in {city}
          </Typography>
          <WeatherCard weather={currentWeather} cityName={city} />
        </Box>
      )}

      {fiveDayForecast.length > 0 && (
        <Box sx={{ my: 4 }}>
          <Typography 
            variant="h4" 
            gutterBottom
            sx={{ 
              color: 'white', 
              fontWeight: 700, 
              textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
              textAlign: 'center',
              mb: 3
            }}
          >
            5-Day Forecast
          </Typography>
          <Box className="forecast-grid">
            {fiveDayForecast.map((item, index) => (
              <WeatherCard key={index} weather={item} isCompact={true} />
            ))}
          </Box>
        </Box>
      )}
    </Container>
  );
};

export default Forecast;

