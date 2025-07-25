// client/src/pages/HomePage.js
import React from 'react';
import { Typography, Box } from '@mui/material';

function HomePage() {
  return (
    <Box sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom align="center">
        Welcome to Hexashop!
      </Typography>
      <Typography variant="body1" align="center">
        Your ultimate destination for fashion trends.
      </Typography>
      {/*
        Here you will start adding components that represent sections from your original index.html:
        - Main Banner/Hero Section
        - Men's, Women's, Kid's Banners
        - Latest Products Section (which will fetch data from your backend)
        - Explore section
        - Social Media Section
        - ... etc.
      */}
      <Box sx={{ mt: 5, p: 3, border: '1px dashed grey', borderRadius: '8px', textAlign: 'center' }}>
        <Typography variant="h6" color="text.secondary">
          This is where your dynamic content will go!
        </Typography>
        <Typography variant="body2" color="text.secondary" mt={1}>
          Start breaking down your original `index.html` into smaller React components and integrate them here.
        </Typography>
      </Box>
    </Box>
  );
}

export default HomePage;