// src/pages/dashboard/Dashboard.js
import React, { useState, useEffect } from 'react';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  AppBar,
  IconButton,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
  Container,
} from '@mui/material';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import WorkIcon from '@mui/icons-material/Work';
import ReceiptIcon from '@mui/icons-material/Receipt';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MoonIcon from '@mui/icons-material/Brightness2';
import SunIcon from '@mui/icons-material/WbSunny';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import TaskIcon from '@mui/icons-material/Task';
import { apiGetUserData } from '../../services/dashboard';
import { apiLogout } from '../../services/auth';

const drawerWidth = 240;
const collapsedWidth = 56;

const Dashboard = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(!useMediaQuery('(max-width:600px)')); // Collapse drawer by default on small screens
  const [fetchTrigger, setFetchTrigger] = useState(false); // State to trigger re-fetch
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await apiGetUserData();
        setUserName(`${data.fullName} `);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUserData();
  }, []);

  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode);
  };

  const handleLogout = async () => {
    try {
      await apiLogout(); // Call the apiLogout function
      navigate('/'); // Navigate to the login page
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const handleAddProject = () => {
    setFetchTrigger((prev) => !prev); // Toggling fetchTrigger to re-fetch projects
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: darkMode ? '#001B12' : '#FFFFFF' }}>
      <AppBar position="fixed" sx={{ bgcolor: darkMode ? '#001B12' : '#00796B', zIndex: 1201 }}>
        <Container maxWidth="xl">
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleDrawerToggle} sx={{ mr: 2 }}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, color: '#FFFFFF' }}>
              {userName} 
            </Typography>
            <IconButton onClick={handleDarkModeToggle} color="inherit">
              {darkMode ? <SunIcon /> : <MoonIcon />}
            </IconButton>
            <IconButton onClick={handleLogout} color="inherit">
              <LogoutIcon />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer
        variant={isMobile ? 'temporary' : 'permanent'}
        open={drawerOpen}
        onClose={handleDrawerToggle}
        sx={{
          width: drawerOpen ? drawerWidth : collapsedWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerOpen ? drawerWidth : collapsedWidth,
            bgcolor: darkMode ? '#001B12' : '#00796B',
            color: '#FFFFFF',
            transition: 'width 0.3s',
            overflowX: 'hidden',
          },
        }}
        ModalProps={{
          keepMounted: true, // Improves performance on mobile
        }}
      >
        <Toolbar />
        <List>
          {[{ text: 'Task', icon: <TaskIcon />, to: '/dashboard' },
            { text: 'Projects', icon: <WorkIcon />, to: '/dashboard/projects' },
            { text: 'Invoice', icon: <ReceiptIcon />, to: '/dashboard/invoice' },
            { text: 'Proposals', icon: <AssignmentIcon />, to: '/dashboard/proposals' },
            { text: 'Profile', icon: <AccountCircleIcon />, to: '/dashboard/profile' },
          ].map(({ text, icon, to }) => (
            <Tooltip title={drawerOpen ? '' : text} arrow key={text} placement="right">
              <ListItem button component={Link} to={to} onClick={isMobile ? handleDrawerToggle : undefined}>
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
          ml: drawerOpen ? 0 : `${collapsedWidth}px`, // Remove space when drawer is open
          color: darkMode ? '#FFFFFF' : '#000000',
          pt: 8,
        }}
      >
        <Toolbar />
        <Container maxWidth="xl">
          <Outlet context={{ handleAddProject, fetchTrigger }} /> {/* Pass handleAddProject and fetchTrigger */}
        </Container>
      </Box>
    </Box>
  );
};

export default Dashboard;