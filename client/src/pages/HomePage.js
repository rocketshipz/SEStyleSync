import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box, Container } from '@mui/material';

function HomePage() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            StyleSync
          </Typography>
          <Button color="inherit" component={Link} to="/login">Login</Button>
          <Button color="inherit" component={Link} to="/signup">Sign Up</Button>
          {/* Add a logout button here later, conditionally rendered */}
        </Toolbar>
      </AppBar>
      <Container maxWidth="md" sx={{ mt: 5, textAlign: 'center' }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Welcome to StyleSync!
        </Typography>
        <Typography variant="h6" paragraph>
          Your ultimate destination for fashion trends and personal style.
        </Typography>
        <Button variant="contained" component={Link} to="/login" sx={{ mr: 2 }}>
          Get Started - Login
        </Button>
        <Button variant="outlined" component={Link} to="/signup">
          Register Now
        </Button>
        <Box sx={{ mt: 5 }}>
          <Typography variant="body1">
            Explore our curated collections and manage your fashion journey.
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
            (This is your main application home page.)
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default HomePage;
