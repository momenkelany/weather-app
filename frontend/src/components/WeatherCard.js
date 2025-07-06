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

const WeatherCard = ({ weather, cityName }) => {
  const getWeatherIcon = (condition) => {
    switch (condition.toLowerCase()) {
      case 'clear':
        return <WbSunny sx={{ color: '#FFD700', fontSize: 40 }} />;
      case 'clouds':
        return <CloudQueue sx={{ color: '#78909C', fontSize: 40 }} />;
      case 'rain':
      case 'drizzle':
        return <WaterDrop sx={{ color: '#4FC3F7', fontSize: 40 }} />;
      case 'thunderstorm':
        return <Thunderstorm sx={{ color: '#5C6BC0', fontSize: 40 }} />;
      case 'snow':
        return <AcUnit sx={{ color: '#90CAF9', fontSize: 40 }} />;
      case 'mist':
      case 'fog':
        return <Grain sx={{ color: '#B0BEC5', fontSize: 40 }} />;
      default:
        return <WbSunny sx={{ color: '#FFD700', fontSize: 40 }} />;
    }
  };

  return (
    <Card sx={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      backdropFilter: 'blur(10px)',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      transition: 'transform 0.2s',
      '&:hover': {
        transform: 'translateY(-5px)',
      },
    }}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box sx={{ textAlign: 'center', mb: 2 }}>
              {cityName && (
                <Typography variant="h5" component="h2" sx={{ mb: 1 }}>
                  {cityName}
                </Typography>
              )}
              {getWeatherIcon(weather.weather[0].main)}
              <Typography variant="h3" component="h2" sx={{ mt: 1 }}>
                {Math.round(weather.main.temp)}°C
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                {weather.weather[0].description}
              </Typography>
            </Box>
          </Grid>
          
          <Grid item xs={12}>
            <Box sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 2,
              mt: 2
            }}>
              <Box sx={{ textAlign: 'center' }}>
                <Opacity sx={{ color: '#4FC3F7', mb: 1 }} />
                <Typography variant="body2" color="text.secondary">Humidity</Typography>
                <Typography variant="h6" sx={{ fontWeight: 'medium' }}>
                  {weather.main.humidity}%
                </Typography>
              </Box>
              
              <Box sx={{ textAlign: 'center' }}>
                <Air sx={{ color: '#81C784', mb: 1 }} />
                <Typography variant="body2" color="text.secondary">Wind</Typography>
                <Typography variant="h6" sx={{ fontWeight: 'medium' }}>
                  {weather.wind.speed} m/s
                </Typography>
              </Box>
              
              <Box sx={{ textAlign: 'center' }}>
                <Speed sx={{ color: '#FFB74D', mb: 1 }} />
                <Typography variant="body2" color="text.secondary">Pressure</Typography>
                <Typography variant="h6" sx={{ fontWeight: 'medium' }}>
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