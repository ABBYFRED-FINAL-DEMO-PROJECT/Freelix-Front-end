import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
} from '@mui/material';
import { Link } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import InfoIcon from '@mui/icons-material/Info';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import MenuIcon from '@mui/icons-material/Menu';

const NavigationBar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleScroll = () => {
    const offset = window.scrollY;
    setScrolled(offset > 50); // Change this value to adjust when the color changes
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const navItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, to: '/dashboard' },
    { text: 'About', icon: <InfoIcon />, to: '/about' },
    { text: 'Login', icon: <LoginIcon />, to: '/login' },
    { text: 'Signup', icon: <PersonAddIcon />, to: '/signup' },
  ];

  return (
    <>
      <AppBar
        position="static"
        sx={{
          backgroundColor: scrolled ? '#00796B' : 'transparent',
          transition: 'background-color 0.3s ease',
        }}
      >
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: { xs: '0 8px', md: '0 16px' },
          }}
        >
          {/* App Logo */}
          <Typography
            variant="h6"
            component="div"
            sx={{
              color: scrolled ? 'white' : '#00796B',
              transition: 'color 0.3s ease',
              fontWeight: 'bold',
            }}
          >
            Freelix
          </Typography>
          {/* For mobile view */}
          <IconButton
            onClick={toggleDrawer(true)}
            sx={{ display: { xs: 'block', md: 'none' }, color: scrolled ? 'white' : '#00796B' }}
          >
            <MenuIcon />
          </IconButton>
          {/* Navigation Buttons for larger screens */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
            {navItems.map((item) => (
              <Button
                key={item.text}
                component={Link}
                to={item.to}
                startIcon={item.icon}
                sx={{
                  color: scrolled ? 'white' : '#00796B',
                  textTransform: 'capitalize',
                  transition: 'color 0.3s ease',
                }}
              >
                {item.text}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Drawer for mobile view */}
      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
          <List>
            {navItems.map((item) => (
              <ListItem button component={Link} to={item.to} key={item.text}>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default NavigationBar;
