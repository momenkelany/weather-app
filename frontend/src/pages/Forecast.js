import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Grid,
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
        const currentResponse = await fetch(
          `http://localhost:5000/api/weather/city/${encodeURIComponent(city.trim())}`
        );

        const currentData = await currentResponse.json();
        if (!currentResponse.ok) {
          throw new Error(currentData.message || 'City not found');
        }
        setCurrentWeather(currentData);

        // Fetch forecast from our backend
        const forecastResponse = await fetch(
          `http://localhost:5000/api/weather/forecast/${encodeURIComponent(city.trim())}`
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

  if (loading) {
    return (
      <Container maxWidth="lg">
        <SearchBox />
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="40vh">
          <CircularProgress size={60} />
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
            severity="error" 
            variant="filled" 
            sx={{ 
              display: 'flex', 
              alignItems: 'center',
              '& .MuiAlert-message': {
                flex: 1
              },
              whiteSpace: 'pre-wrap',
              '& a': {
                color: 'inherit',
                textDecoration: 'underline'
              }
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

  return (
    <Container maxWidth="lg">
      <SearchBox />
      
      {currentWeather && (
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" gutterBottom>
            Current Weather in {city}
          </Typography>
          <WeatherCard weather={currentWeather} />
        </Box>
      )}

      {forecast && (
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" gutterBottom>
            5-Day Forecast
          </Typography>
          <Grid container spacing={2} className="forecast-grid">
            {forecast.list
              .filter((item, index) => index % 8 === 0) // Get one forecast per day
              .slice(0, 5) // Get only 5 days
              .map((item, index) => (
                <Grid item xs={12} sm={6} md={4} lg={2.4} key={index}>
                  <WeatherCard weather={item} />
                </Grid>
              ))}
          </Grid>
        </Box>
      )}
    </Container>
  );
};

export default Forecast; 