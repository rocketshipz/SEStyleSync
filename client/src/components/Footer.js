// client/src/components/Footer.js
import React from 'react';
import { Box, Typography, Container, Grid, Link as MuiLink } from '@mui/material';
import { Link } from 'react-router-dom';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';

function Footer() {
  return (
    <Box sx={{ bgcolor: 'background.paper', p: 6, borderTop: 1, borderColor: 'divider' }} component="footer">
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Useful Links
            </Typography>
            <MuiLink component={Link} to="/" variant="subtitle1" color="text.secondary" display="block">
              Homepage
            </MuiLink>
            <MuiLink component={Link} to="/products" variant="subtitle1" color="text.secondary" display="block">
              Products
            </MuiLink>
            <MuiLink component={Link} to="/about" variant="subtitle1" color="text.secondary" display="block">
              About Us
            </MuiLink>
            <MuiLink component={Link} to="/contact" variant="subtitle1" color="text.secondary" display="block">
              Contact Us
            </MuiLink>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              Help & Information
            </Typography>
            <MuiLink href="#" variant="subtitle1" color="text.secondary" display="block">
              Help
            </MuiLink>
            <MuiLink href="#" variant="subtitle1" color="text.secondary" display="block">
              FAQ's
            </MuiLink>
            <MuiLink href="#" variant="subtitle1" color="text.secondary" display="block">
              Shipping
            </MuiLink>
            <MuiLink href="#" variant="subtitle1" color="text.secondary" display="block">
              Tracking ID
            </MuiLink>
          </Grid>
          {/* You can add more sections like "Store Locations", "Payment Methods" etc. */}
          <Grid item xs={12} md={6}>
            <Typography variant="h6" color="text.primary" gutterBottom>
              About Our Company
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Hexashop is your one-stop online shop for the latest fashion trends. We offer a wide range of products for men, women, and kids.
            </Typography>
            <Box sx={{ mt: 2 }}>
              <MuiLink href="#" color="inherit" sx={{ mr: 1 }}><FacebookIcon /></MuiLink>
              <MuiLink href="#" color="inherit" sx={{ mr: 1 }}><TwitterIcon /></MuiLink>
              <MuiLink href="#" color="inherit" sx={{ mr: 1 }}><LinkedInIcon /></MuiLink>
              <MuiLink href="#" color="inherit"><InstagramIcon /></MuiLink>
            </Box>
          </Grid>
        </Grid>
        <Typography variant="body2" color="text.secondary" align="center" sx={{ pt: 4 }}>
          © {new Date().getFullYear()} Hexashop. All rights reserved. Design: TemplateMo.
        </Typography>
      </Container>
    </Box>
  );
}

export default Footer;