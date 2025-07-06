import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
} from '@mui/material';
import {
  WbSunny,
  Opacity,
  Air,
  Speed,
  Thunderstorm,
  Grain,
  AcUnit,
  WaterDrop,
  CloudQueue,
} from '@mui/icons-material';
import './WeatherCard.css';

const WeatherCard = ({ weather, cityName, isCompact = false }) => {
  const getWeatherIcon = (condition) => {
    const iconSize = isCompact ? 32 : 48;
    switch (condition.toLowerCase()) {
      case 'clear':
        return <WbSunny className="weather-icon" sx={{ color: '#FFD700', fontSize: iconSize }} />;
      case 'clouds':
        return <CloudQueue className="weather-icon" sx={{ color: '#90A4AE', fontSize: iconSize }} />;
      case 'rain':
      case 'drizzle':
        return <WaterDrop className="weather-icon" sx={{ color: '#42A5F5', fontSize: iconSize }} />;
      case 'thunderstorm':
        return <Thunderstorm className="weather-icon" sx={{ color: '#7E57C2', fontSize: iconSize }} />;
      case 'snow':
        return <AcUnit className="weather-icon" sx={{ color: '#E3F2FD', fontSize: iconSize }} />;
      case 'mist':
      case 'fog':
        return <Grain className="weather-icon" sx={{ color: '#CFD8DC', fontSize: iconSize }} />;
      default:
        return <WbSunny className="weather-icon" sx={{ color: '#FFD700', fontSize: iconSize }} />;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  if (isCompact) {
    return (
      <Card className="weather-card forecast-card">
        <CardContent sx={{ padding: '1rem !important', textAlign: 'center' }}>
          {weather.dt_txt && (
            <Typography className="forecast-date" variant="body2" sx={{ mb: 1 }}>
              {formatDate(weather.dt_txt)}
            </Typography>
          )}
          {getWeatherIcon(weather.weather[0].main)}
          <Typography className="forecast-temp" variant="h6" sx={{ my: 1, fontWeight: 600 }}>
            {Math.round(weather.main.temp)}°C
          </Typography>
          <Typography className="forecast-description" variant="caption" sx={{ display: 'block' }}>
            {weather.weather[0].description}
          </Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="weather-card main-weather-card">
      <CardContent sx={{ padding: '2rem !important' }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box sx={{ textAlign: 'center', mb: 3 }}>
              {cityName && (
                <Typography className="city-name" variant="h4" component="h2" sx={{ mb: 2 }}>
                  {cityName}
                </Typography>
              )}
              {getWeatherIcon(weather.weather[0].main)}
              <Typography className="temperature" variant="h2" component="h2" sx={{ mt: 2, mb: 1 }}>
                {Math.round(weather.main.temp)}°C
              </Typography>
              <Typography className="weather-description" variant="h6">
                {weather.weather[0].description}
              </Typography>
            </Box>
          </Grid>
          
          <Grid item xs={12}>
            <Box className="weather-details">
              <Box className="weather-detail-item">
                <Opacity className="weather-detail-icon" sx={{ color: '#42A5F5', fontSize: 24 }} />
                <Typography className="weather-detail-label" variant="body2">
                  Humidity
                </Typography>
                <Typography className="weather-detail-value" variant="h6">
                  {weather.main.humidity}%
                </Typography>
              </Box>
              
              <Box className="weather-detail-item">
                <Air className="weather-detail-icon" sx={{ color: '#66BB6A', fontSize: 24 }} />
                <Typography className="weather-detail-label" variant="body2">
                  Wind Speed
                </Typography>
                <Typography className="weather-detail-value" variant="h6">
                  {weather.wind?.speed || 0} m/s
                </Typography>
              </Box>
              
              <Box className="weather-detail-item">
                <Speed className="weather-detail-icon" sx={{ color: '#FFA726', fontSize: 24 }} />
                <Typography className="weather-detail-label" variant="body2">
                  Pressure
                </Typography>
                <Typography className="weather-detail-value" variant="h6">
                  {weather.main.pressure} hPa
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default WeatherCard;

