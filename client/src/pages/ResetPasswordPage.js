import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Box, TextField, Button, Typography, Container, Alert } from '@mui/material';
import { Lock, Visibility, VisibilityOff } from '@mui/icons-material';
import axios from 'axios';

function ResetPasswordPage() {
  const [email, setEmail] = useState('');
  const [resetToken, setResetToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Get email and resetToken from previous navigation state (from VerifyOtpPage)
    if (location.state && location.state.email && location.state.resetToken) {
      setEmail(location.state.email);
      setResetToken(location.state.resetToken);
    } else {
      // If critical info is missing, redirect to restart the process
      setError('Invalid or missing reset token/email. Please restart password reset.');
      setTimeout(() => {
        navigate('/forgot-password', { replace: true });
      }, 2000);
    }
  }, [location.state, navigate]); // Depend on location.state and navigate

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSuccess('');

    if (newPassword !== confirmNewPassword) {
      setError('New passwords do not match.');
      return;
    }

    if (!resetToken || !email) { // Double check essential data
      setError('Missing reset information. Please restart password reset.');
      return;
    }

    try {
      // Send email, reset token, and new password to backend to finalize reset
      await axios.post('/api/users/reset-password', {
        email,
        resetToken,
        newPassword,
      });

      setSuccess('Password has been reset successfully! You can now log in.');
      setTimeout(() => {
        navigate('/login'); // Redirect to login after successful reset
      }, 2000);

    } catch (err) {
      setError(err.response?.data?.message || 'Password reset failed. Please try again.');
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
          Reset Password
        </Typography>

        {error && <Alert severity="error" sx={{ width: '100%', mb: 2, borderRadius: '8px' }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ width: '100%', mb: 2, borderRadius: '8px' }}>{success}</Alert>}

        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ width: '100%' }}>
          <TextField
            margin="normal"
            required
            fullWidth
            name="newPassword"
            label="New Password"
            type={showNewPassword ? 'text' : 'password'}
            id="newPassword"
            autoComplete="new-password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            InputProps={{
              startAdornment: (
                <Lock sx={{ color: 'action.active', mr: 1 }} />
              ),
              endAdornment: (
                <Button onClick={() => setShowNewPassword(!showNewPassword)} sx={{ minWidth: 0, p: 0 }}>
                  {showNewPassword ? <VisibilityOff /> : <Visibility />}
                </Button>
              ),
            }}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="confirmNewPassword"
            label="Confirm New Password"
            type={showConfirmNewPassword ? 'text' : 'password'}
            id="confirmNewPassword"
            autoComplete="new-password"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            InputProps={{
              startAdornment: (
                <Lock sx={{ color: 'action.active', mr: 1 }} />
              ),
              endAdornment: (
                <Button onClick={() => setShowConfirmNewPassword(!showConfirmNewPassword)} sx={{ minWidth: 0, p: 0 }}>
                  {showConfirmNewPassword ? <VisibilityOff /> : <Visibility />}
                </Button>
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
            Reset Password
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

export default ResetPasswordPage;
