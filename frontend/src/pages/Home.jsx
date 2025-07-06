import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import SearchBox from '../components/SearchBox';

const Home = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ textAlign: 'center', my: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Weather Forecast
        </Typography>
        <Typography variant="h6" color="text.secondary" paragraph>
          Get real-time weather updates and forecasts for any city
        </Typography>
      </Box>
      
      <SearchBox />
      
      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Typography variant="body1" color="text.secondary">
          Enter a city name or use your current location to get started
        </Typography>
      </Box>
    </Container>
  );
};

export default Home; 