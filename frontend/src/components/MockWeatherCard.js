import React from 'react';
import WeatherCard from './WeatherCard';

const MockWeatherCard = () => {
  // Mock weather data for testing
  const mockCurrentWeather = {
    weather: [
      {
        main: 'Clear',
        description: 'clear sky'
      }
    ],
    main: {
      temp: 22,
      humidity: 65,
      pressure: 1013
    },
    wind: {
      speed: 3.5
    }
  };

  const mockForecastData = [
    {
      dt_txt: '2025-07-06 12:00:00',
      weather: [{ main: 'Clouds', description: 'few clouds' }],
      main: { temp: 20 }
    },
    {
      dt_txt: '2025-07-07 12:00:00',
      weather: [{ main: 'Rain', description: 'light rain' }],
      main: { temp: 18 }
    },
    {
      dt_txt: '2025-07-08 12:00:00',
      weather: [{ main: 'Clear', description: 'clear sky' }],
      main: { temp: 25 }
    },
    {
      dt_txt: '2025-07-09 12:00:00',
      weather: [{ main: 'Thunderstorm', description: 'thunderstorm' }],
      main: { temp: 19 }
    },
    {
      dt_txt: '2025-07-10 12:00:00',
      weather: [{ main: 'Snow', description: 'light snow' }],
      main: { temp: 2 }
    }
  ];

  return (
    <div style={{ padding: '2rem' }}>
      <h2 style={{ color: 'white', textAlign: 'center', marginBottom: '2rem' }}>
        Weather Card Styling Test
      </h2>
      
      {/* Main Weather Card */}
      <WeatherCard weather={mockCurrentWeather} cityName="London" />
      
      {/* Forecast Cards */}
      <h3 style={{ color: 'white', textAlign: 'center', margin: '3rem 0 2rem 0' }}>
        5-Day Forecast Cards
      </h3>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', 
        gap: '1.5rem' 
      }}>
        {mockForecastData.map((item, index) => (
          <WeatherCard key={index} weather={item} isCompact={true} />
        ))}
      </div>
    </div>
  );
};

export default MockWeatherCard;

