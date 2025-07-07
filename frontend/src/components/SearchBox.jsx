import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TextField,
  Button,
  Box,
  CircularProgress,
  Snackbar,
  Alert,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import './SearchBox.css';

const SearchBox = () => {
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;

  const handleSearch = (e) => {
    e.preventDefault();
    if (city.trim()) {
      navigate(`/forecast/${encodeURIComponent(city.trim())}`);
    }
  };

  const handleLocationClick = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      return;
    }

    setLoading(true);
    setError('');

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const response = await fetch(
            `${backendUrl}/api/weather/coordinates?lat=${latitude}&lon=${longitude}`
          );

          if (!response.ok) {
            throw new Error('Failed to fetch weather data for your location');
          }

          const data = await response.json();
          if (data && data.name) {
            navigate(`/forecast/${encodeURIComponent(data.name)}`);
          } else {
            throw new Error('Could not determine your location');
          }
        } catch (error) {
          console.error('Error fetching location weather:', error);

          // Fallback: reverse geocoding via OpenWeather
          try {
            const geoResponse = await fetch(
              `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${apiKey}`
            );

            if (geoResponse.ok) {
              const geoData = await geoResponse.json();
              if (geoData && geoData[0] && geoData[0].name) {
                navigate(`/forecast/${encodeURIComponent(geoData[0].name)}`);
                return;
              }
            }
          } catch (geoError) {
            console.error('Geocoding fallback failed:', geoError);
          }

          setError(error.message || 'Failed to get weather for your location');
        } finally {
          setLoading(false);
        }
      },
      (error) => {
        console.error('Geolocation error:', error);
        setLoading(false);

        let errorMessage = 'Failed to get your location. ';
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage += 'Please allow location access in your browser settings.';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage += 'Location information is unavailable.';
            break;
          case error.TIMEOUT:
            errorMessage += 'Location request timed out.';
            break;
          default:
            errorMessage += 'An unknown error occurred.';
            break;
        }

        setError(errorMessage);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000, // 5 minutes
      }
    );
  };

  return (
    <Box
      component="form"
      onSubmit={handleSearch}
      className="search-form"
      sx={{
        display: 'flex',
        gap: 2,
        maxWidth: 600,
        margin: '0 auto',
        flexWrap: 'wrap',
        justifyContent: 'center',
        position: 'relative',
      }}
    >
      <TextField
        className="TextField"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city name"
        fullWidth
        disabled={loading}
        sx={{ flexGrow: 1, minWidth: '200px' }}
      />
      <Button
        type="submit"
        variant="contained"
        className="search-button"
        startIcon={<SearchIcon />}
        disabled={loading || !city.trim()}
        sx={{ height: '56px' }}
      >
        Search
      </Button>
      <Button
        onClick={handleLocationClick}
        variant="outlined"
        className="location-button"
        startIcon={loading ? <CircularProgress size={20} /> : <MyLocationIcon />}
        disabled={loading}
        sx={{ height: '56px' }}
      >
        Use My Location
      </Button>
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError('')}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setError('')} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default SearchBox;
