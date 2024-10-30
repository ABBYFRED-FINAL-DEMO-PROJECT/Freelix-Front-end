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
    <Box sx={{ marginTop: 8, marginBottom: 8, display: 'flex', justifyContent: 'center' }}>
      <Card sx={{ display: 'flex', maxWidth: 900, borderRadius: 3, overflow: 'hidden', boxShadow: 5 }}>
        {/* Left Side: Signup Form */}
        <CardContent sx={{ width: '50%', padding: 4 }}>
          <Typography variant="h4" gutterBottom align="center" color="primary">
            Sign Up
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {/* Full Name and Username on the same line */}
              <Grid item xs={6}>
                <TextField
                  fullWidth label="Full Name" placeholder="Enter your full name"
                  name="fullName" value={formData.fullName} onChange={handleChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth label="Username" placeholder="Choose a username"
                  name="username" value={formData.username} onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth label="Email" placeholder="youremail@.com"
                  name="email" type="email" value={formData.email} onChange={handleChange}
                />
              </Grid>

              {/* Password and Repeat Password on the same line */}
              <Grid item xs={6}>
                <TextField
                  fullWidth label="Password" placeholder="Create a password"
                  name="password" type={showPassword ? 'text' : 'password'}
                  value={formData.password} onChange={handleChange}
                  InputProps={{
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

              {/* Phone Number and Personal ID on the same line */}
              <Grid item xs={6}>
                <TextField
                  fullWidth label="Phone Number" placeholder="Enter your phone number"
                  name="phoneNumber" type="tel" value={formData.phoneNumber} onChange={handleChange}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth label="Personal ID" placeholder="Enter your personal ID"
                  name="personalId" value={formData.personalId} onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox name="rememberMe" checked={formData.rememberMe} onChange={handleChange} />}
                  label="Remember Me"
                />
              </Grid>

              <Grid item xs={12}>
                <Button
                  fullWidth variant="contained" sx={{ backgroundColor: '#00796B', color: '#fff', marginY: 2 }}
                  type="submit"
                >
                  Sign Up
                </Button>
              </Grid>

              {/* Sign Up with Google Button using Google Colors */}
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
                  startIcon={<GoogleIcon sx={{ color: '#4285F4' }} />}
                >
                  Sign Up with Google
                </Button>
              </Grid>

              <Grid item xs={12} display="flex" justifyContent="center">
                <Link href="/login" variant="body2" sx={{ color: '#00796B' }}>
                  Already have an account? Log in
                </Link>
              </Grid>
            </Grid>
          </form>
        </CardContent>

        {/* Right Side: Reasons to Sign Up */}
        <Box
          sx={{
            width: '50%',
            backgroundColor: '#00796B',
            color: 'white',
            padding: 4,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 85%)'
          }}
        >
          <Typography variant="h5" gutterBottom>
            Why Sign Up?
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            ✔️ Access exclusive projects and opportunities.
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            ✔️ Effortlessly track your time and manage invoices.
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            ✔️ Build your profile and grow your freelance business.
          </Typography>
          <Typography variant="body1">
            ✔️ Seamlessly collaborate with clients.
          </Typography>
        </Box>
      </Card>

      {/* Toast Container to display success messages */}
      <ToastContainer />
    </Box>
  );
};

export default Signup;
