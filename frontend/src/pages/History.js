import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Button,
  Box,
  CircularProgress,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import WeatherCard from '../components/WeatherCard';

const History = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchHistory = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/history');
      const data = await response.json();
      setHistory(data);
    } catch (err) {
      setError('Error fetching search history');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const clearHistory = () => {
    // Only clear the history from the UI
    setHistory([]);
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" gutterBottom>
          Search History
        </Typography>
        
        {error && (
          <Typography color="error" gutterBottom>
            {error}
          </Typography>
        )}

        {history.length > 0 ? (
          <>
            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
              <Button
                variant="outlined"
                color="error"
                startIcon={<DeleteIcon />}
                onClick={clearHistory}
              >
                Clear View
              </Button>
              <Button
                variant="outlined"
                color="primary"
                onClick={fetchHistory}
              >
                Refresh History
              </Button>
            </Box>
            
            <div className="history-list">
              {history.map((item) => (
                <WeatherCard
                  key={item._id}
                  weather={item.weatherData}
                  cityName={item.city}
                  onClick={() => navigate(`/forecast/${item.city}`)}
                />
              ))}
            </div>
          </>
        ) : (
          <Typography variant="body1" color="text.secondary">
            No search history available
          </Typography>
        )}
      </Box>
    </Container>
  );
};

export default History; 