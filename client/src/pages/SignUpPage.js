import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Box, TextField, Button, Typography, Container, Checkbox, FormControlLabel, Alert } from '@mui/material';
import { AccountCircle, Email, Lock, Visibility, VisibilityOff } from '@mui/icons-material';
import axios from 'axios'; // For making API requests to your backend

function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (event) => {
    event.preventDefault();
    setError('');
    setSuccess('');

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      // Make sure your backend server is running (e.g., on port 5000 as per your .env)
      // If your client and server are on different ports/domains, you might need a proxy
      // in package.json or full URL like 'http://localhost:5000/api/users/register'
      const response = await axios.post('http://localhost:5000/api/users/login', {
        name,
        email,
        password,
      });

      setSuccess('Registration successful! You can now log in.');
      // Optionally, redirect to login page after a short delay
      setTimeout(() => {
        navigate('/login');
      }, 2000);

    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          p: 3,
          borderRadius: '12px',
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
          backgroundColor: 'white',
        }}
      >
        <Typography component="h1" variant="h5" sx={{ mb: 3, fontWeight: 'bold' }}>
          Sign Up
        </Typography>

        {error && <Alert severity="error" sx={{ width: '100%', mb: 2, borderRadius: '8px' }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ width: '100%', mb: 2, borderRadius: '8px' }}>{success}</Alert>}

        <Box component="form" onSubmit={handleSignup} noValidate sx={{ width: '100%' }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Username"
            name="name"
            autoComplete="username"
            autoFocus
            value={name}
            onChange={(e) => setName(e.target.value)}
            InputProps={{
              startAdornment: (
                <AccountCircle sx={{ color: 'action.active', mr: 1 }} />
              ),
            }}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            InputProps={{
              startAdornment: (
                <Email sx={{ color: 'action.active', mr: 1 }} />
              ),
            }}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            id="password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              startAdornment: (
                <Lock sx={{ color: 'action.active', mr: 1 }} />
              ),
              endAdornment: (
                <Button onClick={() => setShowPassword(!showPassword)} sx={{ minWidth: 0, p: 0 }}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </Button>
              ),
            }}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirm Password"
            type={showConfirmPassword ? 'text' : 'password'}
            id="confirmPassword"
            autoComplete="new-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            InputProps={{
              startAdornment: (
                <Lock sx={{ color: 'action.active', mr: 1 }} />
              ),
              endAdornment: (
                <Button onClick={() => setShowConfirmPassword(!showConfirmPassword)} sx={{ minWidth: 0, p: 0 }}>
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </Button>
              ),
            }}
            sx={{ mb: 2 }}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember Me"
            sx={{ mb: 2 }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, borderRadius: '8px', py: 1.5, fontWeight: 'bold', backgroundColor: '#3f51b5', '&:hover': { backgroundColor: '#303f9f' } }}
          >
            Sign Up
          </Button>

          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="body2">
              Have an account? <Link to="/login" style={{ textDecoration: 'none', color: '#3f51b5', fontWeight: 'bold' }}>Login</Link>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}

export default SignupPage;
