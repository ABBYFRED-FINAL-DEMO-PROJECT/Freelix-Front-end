import React, { useState } from 'react';
import {
  Box, Button, CircularProgress, Grid, IconButton, InputAdornment, Link,
  TextField, Typography, Card, CardContent, CardMedia
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import { apiUserLogin } from "../services/auth"; // Import API function

const Login = () => {
  const [formData, setFormData] = useState({
    email: '', password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await apiUserLogin(formData); // API call
      console.log(response.data);
      toast.success('Login Successful!', {
        position: 'top-center',
        autoClose: 1000,
        onClose: () => navigate('/dashboard'),
      });
    } catch (error) {
      console.log(error);
      toast.error('Login failed, please try again');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ marginTop: 4, marginBottom: 4, display: 'flex', justifyContent: 'center', px: 2 }}>
      <Card sx={{
        display: 'flex', flexDirection: { xs: 'column', md: 'row' },
        maxWidth: 750, width: '100%', borderRadius: 3, overflow: 'hidden', boxShadow: 5,
        minHeight: { xs: 280, md: 340 }
      }}>
        {/* Left Side: Login Form */}
        <CardContent sx={{ width: { xs: '100%', md: '50%' }, padding: 2 }}>
          <Typography variant="h4" gutterBottom align="center" color="#00796B">
            Login
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <TextField
                  fullWidth label="Email" placeholder="youremail@.com"
                  name="email" type="email" value={formData.email} onChange={handleChange}
                  required
                  InputProps={{ sx: { paddingY: 0.3, fontSize: '0.9rem' } }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth label="Password" placeholder="Enter your password"
                  name="password" type={showPassword ? 'text' : 'password'}
                  value={formData.password} onChange={handleChange}
                  required
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
              <Grid item xs={12}>
                <Button
                  fullWidth
                  variant="contained"
                  sx={{ backgroundColor: '#00796B', color: '#fff', mt: 1 }}
                  type="submit"
                  disabled={loading}
                  startIcon={loading && <CircularProgress size={20} color="inherit" />}
                >
                  {loading ? 'Logging In...' : 'Login'}
                </Button>
                <Link href="/forgot-password" variant="body2" sx={{ color: '#00796B', ml: 1 }}>
                  Forgot Password?
                </Link>
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
                  startIcon={<img src="/google.svg" alt="Google G logo" style={{ width: 20, height: 20 }} />}
                >
                  Login with Google
                </Button>
              </Grid>
              <Grid item xs={12} display="flex" justifyContent="center">
                <Link href="/signup" variant="body2" sx={{ color: '#00796B', textAlign: 'center' }}>
                  New here? Sign up
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

        {/* Right Side: Illustration */}
        <CardMedia
          component="img"
          sx={{ width: { xs: '100%', md: '50%' }, objectFit: 'cover' }}
          image="/login.png" // Adjusted path to point directly to public folder
          alt="Login illustration"
        />
      </Card>

      <ToastContainer />
    </Box>
  );
};

export default Login;
