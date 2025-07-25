import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Box, TextField, Button, Typography, Container, Alert } from '@mui/material';
import { Lock } from '@mui/icons-material';
import axios from 'axios';

function VerifyOtpPage() {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Get email from previous navigation state (from RequestOtpPage)
    if (location.state && location.state.email) {
      setEmail(location.state.email);
    } else {
      // If no email, redirect back to forgot password to re-enter email
      setError('Email not provided. Please request OTP again.');
      setTimeout(() => {
        navigate('/forgot-password', { replace: true });
      }, 2000);
    }
  }, [location.state, navigate]); // Depend on location.state and navigate

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSuccess('');

    if (!email) {
      setError('Email is required. Please go back and request OTP.');
      return;
    }

    try {
      // Send email and OTP to backend for verification
      const response = await axios.post('/api/users/verify-otp', { email, otp });
      setSuccess('OTP verified. You can now reset your password.');
      const { resetToken } = response.data;

      setTimeout(() => {
        // Navigate to reset-password page, passing email and resetToken
        navigate('/reset-password', { state: { email, resetToken } });
      }, 2000);

    } catch (err) {
      setError(err.response?.data?.message || 'OTP verification failed. Please try again.');
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
          Verify OTP
        </Typography>
        <Typography variant="body2" sx={{ mb: 2, textAlign: 'center' }}>
          Enter the OTP sent to your email ({email || '...'}).
        </Typography>

        {error && <Alert severity="error" sx={{ width: '100%', mb: 2, borderRadius: '8px' }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ width: '100%', mb: 2, borderRadius: '8px' }}>{success}</Alert>}

        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ width: '100%' }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="otp"
            label="One-Time Password"
            name="otp"
            type="text"
            autoFocus
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            InputProps={{
              startAdornment: (
                <Lock sx={{ color: 'action.active', mr: 1 }} />
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
            Verify OTP
          </Button>
          <Box sx={{ textAlign: 'center' }}>
            <Link to="/forgot-password" style={{ textDecoration: 'none', color: '#3f51b5', fontWeight: 'bold' }}>
              Resend OTP or Change Email
            </Link>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}

export default VerifyOtpPage;
