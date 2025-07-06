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

const SearchBox = () => {
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

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
          const apiKey = process.env.REACT_APP_OPENWEATHER_API_KEY;
          if (!apiKey) {
            throw new Error('OpenWeather API key is not configured');
          }

          const response = await fetch(
            `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${apiKey}`
          );
          
          if (!response.ok) {
            throw new Error('Failed to fetch location data');
          }

          const data = await response.json();
          if (data && data[0] && data[0].name) {
            navigate(`/forecast/${encodeURIComponent(data[0].name)}`);
          } else {
            throw new Error('Could not determine your location');
          }
        } catch (error) {
          console.error('Error fetching location:', error);
          setError(error.message || 'Failed to get your location');
        } finally {
          setLoading(false);
        }
      },
      (error) => {
        console.error('Geolocation error:', error);
        setLoading(false);
        setError('Failed to get your location. Please allow location access.');
      }
    );
  };

  return (
    <Box
      component="form"
      onSubmit={handleSearch}
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
        startIcon={<SearchIcon />}
        disabled={loading || !city.trim()}
        sx={{ height: '56px' }}
      >
        Search
      </Button>
      <Button
        onClick={handleLocationClick}
        variant="outlined"
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