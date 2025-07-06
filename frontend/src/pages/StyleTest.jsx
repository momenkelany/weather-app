import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import MockWeatherCard from '../components/MockWeatherCard';

const StyleTest = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography 
          variant="h3" 
          component="h1" 
          gutterBottom
          sx={{ 
            color: 'white', 
            fontWeight: 700, 
            textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
            textAlign: 'center',
            mb: 4
          }}
        >
          Weather Card Style Test
        </Typography>
        <MockWeatherCard />
      </Box>
    </Container>
  );
};

export default StyleTest;

