// src/layouts/NavigationBar.jsx
import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import InfoIcon from '@mui/icons-material/Info';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

const NavigationBar = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#00796B' }}>
      <Toolbar className="flex justify-between items-center">
        {/* App Logo */}
        <Typography variant="h6" component="div" className="text-white font-semibold">
          Freelix
        </Typography>
        {/* Navigation Buttons */}
        <div className="flex space-x-4">
          <Button component={Link} to="/dashboard" startIcon={<DashboardIcon />} sx={{ color: 'white', textTransform: 'capitalize' }}>
            Dashboard
          </Button>
          <Button component={Link} to="/about" startIcon={<InfoIcon />} sx={{ color: 'white', textTransform: 'capitalize' }}>
            About
          </Button>
          <Button component={Link} to="/login" startIcon={<LoginIcon />} sx={{ color: 'white', textTransform: 'capitalize' }}>
            Login
          </Button>
          <Button component={Link} to="/signup" startIcon={<PersonAddIcon />} sx={{ color: 'white', textTransform: 'capitalize' }}>
            Signup
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default NavigationBar;
