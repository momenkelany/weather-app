import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Forecast from './pages/Forecast';
import History from './pages/History';
import StyleTest from './pages/StyleTest';
import './styles/App.css';

const key = import.meta.env.VITE_OPENWEATHER_API_KEY;

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <div className="app">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/weather-app/" element={<Home />} />
              <Route path="/forecast/:city" element={<Forecast />} />
              <Route path="/history" element={<History />} />
              <Route path="/style-test" element={<StyleTest />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </BrowserRouter>
  );
  
}

export default App;
