import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
} from '@mui/material';
import CloudIcon from '@mui/icons-material/Cloud';
import './Navbar.css'

const Navbar = () => {
  return (
    <AppBar className='Navbar' position="static">
      <Container maxWidth="lg">
        <Toolbar>
          <CloudIcon sx={{ mr: 2 }} />
          <Typography
            variant="h6"
            component={RouterLink}
            to="/"
            sx={{
              flexGrow: 1,
              textDecoration: 'none',
              color: 'inherit',
            }}
          >
            Weather Forecast
          </Typography>
          <Button
            color="inherit"
            component={RouterLink}
            to="/"
          >
            Home
          </Button>
          <Button
            color="inherit"
            component={RouterLink}
            to="/history"
          >
            History
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar; 