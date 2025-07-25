import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Box, TextField, Button, Typography, Container, Alert } from '@mui/material';
import { Email } from '@mui/icons-material';
import axios from 'axios';

function RequestOtpPage() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSuccess('');

    try {
      await axios.post('/api/users/request-otp', { email });
      setSuccess('OTP sent to your email. Please check your inbox.');
      setTimeout(() => {
        // Navigate to verify-otp page, passing email via state
        navigate('/verify-otp', { state: { email } });
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to request OTP. Please try again.');
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
          Forgot Password
        </Typography>
        <Typography variant="body2" sx={{ mb: 2, textAlign: 'center' }}>
          Enter your email to receive a One-Time Password (OTP).
        </Typography>

        {error && <Alert severity="error" sx={{ width: '100%', mb: 2, borderRadius: '8px' }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ width: '100%', mb: 2, borderRadius: '8px' }}>{success}</Alert>}

        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ width: '100%' }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            InputProps={{
              startAdornment: (
                <Email sx={{ color: 'action.active', mr: 1 }} />
              ),
            }}
            sx={{ mb: 2 }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, borderRadius: '8px', py: 1.5, fontWeight: 'bold', backgroundColor: '#3f51b5', '&:hover': { backgroundColor: '#303f9f' } }}
          >
            Request OTP
          </Button>
          <Box sx={{ textAlign: 'center' }}>
            <Link to="/login" style={{ textDecoration: 'none', color: '#3f51b5', fontWeight: 'bold' }}>
              Back to Login
            </Link>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}

export default RequestOtpPage;
