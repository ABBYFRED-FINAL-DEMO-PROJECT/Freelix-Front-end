import React, { useState } from 'react';
import {
  Box, Button, Checkbox, FormControlLabel, Grid, IconButton, InputAdornment, Link,
  TextField, Typography, Card, CardContent
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import GoogleIcon from '@mui/icons-material/Google';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
  const [formData, setFormData] = useState({
    fullName: '', username: '', email: '', password: '', repeatPassword: '',
    phoneNumber: '', personalId: '', rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    toast.success('Sign Up Successful!', {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 2000,
    });
  };

  return (
    <Box sx={{ marginTop: 4, marginBottom: 4, display: 'flex', justifyContent: 'center', px: 2 }}>
      <Card sx={{
        display: 'flex', flexDirection: { xs: 'column', md: 'row' },
        maxWidth: 750, width: '100%', borderRadius: 3, overflow: 'hidden', boxShadow: 5,
        minHeight: { xs: 280, md: 340 } // Slightly reduced height for responsiveness
      }}>
        {/* Left Side: Signup Form */}
        <CardContent sx={{ width: { xs: '100%', md: '50%' }, padding: 2 }}>
          <Typography variant="h4" gutterBottom align="center" color="primary">
            Sign Up
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <TextField
                  fullWidth label="Full Name" placeholder="Enter your full name"
                  name="fullName" value={formData.fullName} onChange={handleChange}
                  InputProps={{ sx: { paddingY: 0.3, fontSize: '0.9rem' } }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth label="Username" placeholder="Choose a username"
                  name="username" value={formData.username} onChange={handleChange}
                  InputProps={{ sx: { paddingY: 0.3, fontSize: '0.9rem' } }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth label="Email" placeholder="youremail@.com"
                  name="email" type="email" value={formData.email} onChange={handleChange}
                  InputProps={{ sx: { paddingY: 0.3, fontSize: '0.9rem' } }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth label="Password" placeholder="Create a password"
                  name="password" type={showPassword ? 'text' : 'password'}
                  value={formData.password} onChange={handleChange}
                  InputProps={{
                    sx: { paddingY: 0.3, fontSize: '0.9rem' },
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowPassword(!showPassword)}>
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth label="Repeat Password" placeholder="Re-enter your password"
                  name="repeatPassword" type={showPassword ? 'text' : 'password'}
                  value={formData.repeatPassword} onChange={handleChange}
                  InputProps={{
                    sx: { paddingY: 0.3, fontSize: '0.9rem' },
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowPassword(!showPassword)}>
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                    placeholder: "Re-enter your password" // Ensure the placeholder text does not overlap
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth label="Phone Number" placeholder="Enter your phone number"
                  name="phoneNumber" type="tel" value={formData.phoneNumber} onChange={handleChange}
                  InputProps={{ sx: { paddingY: 0.3, fontSize: '0.9rem' } }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth label="Personal ID" placeholder="Enter your personal ID"
                  name="personalId" value={formData.personalId} onChange={handleChange}
                  InputProps={{ sx: { paddingY: 0.3, fontSize: '0.9rem' } }}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  fullWidth variant="contained" sx={{ backgroundColor: '#00796B', color: '#fff', mt: 1 }}
                  type="submit"
                >
                  Sign Up
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button
                  fullWidth variant="outlined" sx={{
                    color: '#4285F4',
                    borderColor: '#4285F4',
                    '&:hover': {
                      backgroundColor: '#E8F0FE',
                      borderColor: '#4285F4',
                    },
                  }}
                  startIcon={<GoogleIcon sx={{ color: '#EA4335' }} />}
                >
                  Sign Up with Google
                </Button>
              </Grid>
              <Grid item xs={12} display="flex" justifyContent="center">
                <Link href="/login" variant="body2" sx={{ color: '#00796B', textAlign: 'center' }}>
                  Already have an account? Log in
                </Link>
              </Grid>
              <Grid item xs={12} display="flex" justifyContent="center">
                <Link href="/" variant="body2" sx={{ color: '#00796B', textAlign: 'center', mt: 1 }}>
                  Back to Home
                </Link>
              </Grid>
            </Grid>
          </form>
        </CardContent>

        {/* Right Side: Reasons to Sign Up */}
        <Box
          sx={{
            width: { xs: '100%', md: '50%' }, backgroundColor: '#00796B', color: 'white', padding: 3,
            display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
            clipPath: { md: 'polygon(0 0, 100% 0, 100% 100%, 0 85%)' }
          }}
        >
          <Typography variant="h5" gutterBottom>
            Why Sign Up?
          </Typography>
          <Typography variant="body1" sx={{ mb: 1, display: 'flex', alignItems: 'center' }}>
            <Box component="span" sx={{ color: 'white', mr: 1 }}>✔️</Box>
            Access exclusive projects and opportunities.
          </Typography>
          <Typography variant="body1" sx={{ mb: 1, display: 'flex', alignItems: 'center' }}>
            <Box component="span" sx={{ color: 'white', mr: 1 }}>✔️</Box>
            Effortlessly track your time and manage invoices.
          </Typography>
          <Typography variant="body1" sx={{ mb: 1, display: 'flex', alignItems: 'center' }}>
            <Box component="span" sx={{ color: 'white', mr: 1 }}>✔️</Box>
            Build your profile and grow your freelance business.
          </Typography>
          <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center' }}>
            <Box component="span" sx={{ color: 'white', mr: 1 }}>✔️</Box>
            Seamlessly collaborate with clients.
          </Typography>
        </Box>
      </Card>

      <ToastContainer />
    </Box>
  );
};

export default Signup;
