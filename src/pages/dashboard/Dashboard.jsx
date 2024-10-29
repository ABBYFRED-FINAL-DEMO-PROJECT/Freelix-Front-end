// src/pages/dashboard/Dashboard.js
import React, { useState } from 'react';
import { Box, Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar, AppBar, IconButton, Tooltip } from '@mui/material';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import WorkIcon from '@mui/icons-material/Work';
import ReceiptIcon from '@mui/icons-material/Receipt';
import AssignmentIcon from '@mui/icons-material/Assignment';
import MoonIcon from '@mui/icons-material/Brightness2';
import SunIcon from '@mui/icons-material/WbSunny';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';

const drawerWidth = 240;

const Dashboard = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(true);
  const navigate = useNavigate();

  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode);
  };

  const handleLogout = () => {
    navigate('/');
  };

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: darkMode ? '#001B12' : '#FFFFFF' }}>
      <AppBar position="fixed" sx={{ bgcolor: darkMode ? '#001B12' : '#00796B', zIndex: 1201 }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={handleDrawerToggle}>
            <MenuIcon />
          </IconButton>
          <h1 style={{ flexGrow: 1, color: '#FFFFFF' }}>Dashboard</h1>
          <IconButton onClick={handleDarkModeToggle} color="inherit">
            {darkMode ? <SunIcon /> : <MoonIcon />}
          </IconButton>
          <IconButton onClick={handleLogout} color="inherit">
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        open={drawerOpen}
        sx={{
          width: drawerOpen ? drawerWidth : 56, // Minimized width when collapsed
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerOpen ? drawerWidth : 56,
            bgcolor: darkMode ? '#001B12' : '#00796B',
            color: '#FFFFFF',
            transition: 'width 0.3s',
            overflowX: 'hidden', // Hide overflow in collapsed state
          },
        }}
      >
        <Toolbar /> {/* This helps offset the AppBar height */}
        <List>
          {[
            { text: 'Overview', icon: <AccountCircleIcon />, to: '/dashboard' },
            { text: 'Projects', icon: <WorkIcon />, to: '/dashboard/projects' },
            { text: 'Invoices', icon: <ReceiptIcon />, to: '/dashboard/invoices' },
            { text: 'Proposals', icon: <AssignmentIcon />, to: '/dashboard/proposals' },
            { text: 'Profile', icon: <AccountCircleIcon />, to: '/dashboard/profile' },
          ].map(({ text, icon, to }) => (
            <Tooltip title={drawerOpen ? '' : text} arrow key={text} placement="right">
              <ListItem button component={Link} to={to}>
                <ListItemIcon sx={{ color: '#FFFFFF' }}>
                  {icon}
                </ListItemIcon>
                {drawerOpen && <ListItemText primary={text} sx={{ color: '#FFFFFF' }} />}
              </ListItem>
            </Tooltip>
          ))}
        </List>
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          transition: 'margin 0.3s',
          ml: drawerOpen ? `${drawerWidth}px` : '56px', // Adjust main content margin based on drawer state
          color: darkMode ? '#FFFFFF' : '#000000',
          pt: 8, // Ensures main content doesn’t overlap with AppBar
        }}
      >
        <Toolbar /> {/* Spacer Toolbar to prevent overlap with AppBar */}
        <Outlet /> {/* Render child routes */}
      </Box>
    </Box>
  );
};

export default Dashboard;
