// client/src/components/Header.js
import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu'; // Import MenuIcon for mobile
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'; // Import CartIcon
import PersonIcon from '@mui/icons-material/Person'; // Import PersonIcon for login/profile
import { Link } from 'react-router-dom';

function Header() {
  return (
    <AppBar position="static" color="inherit" elevation={0} sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        {/* Logo Section */}
        <Typography 
          variant="h6" 
          component={Link} 
          to="/" 
          sx={{ textDecoration: 'none', color: 'inherit', fontWeight: 'bold' }}
        >
          Hexashop
        </Typography>

        {/* Navigation Links (visible on medium and larger screens) */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
          <Button component={Link} to="/" sx={{ color: 'text.primary' }}>
            Home
          </Button>
          <Button component={Link} to="/products" sx={{ color: 'text.primary' }}>
            Products
          </Button>
          <Button component={Link} to="/about" sx={{ color: 'text.primary' }}>
            About Us
          </Button>
          <Button component={Link} to="/contact" sx={{ color: 'text.primary' }}>
            Contact Us
          </Button>
          {/* Placeholder for User/Admin links - will be dynamic later */}
          <Button component={Link} to="/login" sx={{ color: 'text.primary' }}>
            <PersonIcon sx={{ mr: 0.5 }} fontSize="small" /> Login
          </Button>
          <Button component={Link} to="/cart" sx={{ color: 'text.primary' }}>
            <ShoppingCartIcon sx={{ mr: 0.5 }} fontSize="small" /> Cart
          </Button>
        </Box>

        {/* Mobile Menu Icon (visible on small screens) */}
        <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;