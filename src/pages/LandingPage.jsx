// src/pages/LandingPage.js
import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div>
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h1>Welcome to Freelix</h1>
        <p>Your one-stop solution for managing freelance projects.</p>
        <Button variant="contained" color="primary" component={Link} to="/dashboard">
          Get Started
        </Button>
      </div>

      <footer style={{ textAlign: 'center', padding: '10px', backgroundColor: '#00796B', color: '#fff' }}>
        <p>© 2024 Freelix. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
