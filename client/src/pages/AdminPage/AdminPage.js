import React, { useState, useEffect } from 'react';
import { useNavigate, Routes, Route, Link, useLocation } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Box, Drawer, List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import CategoryIcon from '@mui/icons-material/Category';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'; // For Order Management
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

// Import the ProductManagement component
import ProductManagement from './ProductManagement';

// Dummy Components for other Admin Sections (can be expanded later)
const AdminDashboard = () => (
  <Box sx={{ p: 3 }}>
    <Typography variant="h4" gutterBottom>Admin Dashboard</Typography>
    <Typography variant="body1">Welcome to the admin panel! Use the sidebar to navigate.</Typography>
    <Typography variant="body2" sx={{ mt: 2 }}>
        Currently logged in as admin. You can manage products, users, and orders from here.
    </Typography>
  </Box>
);
const UserManagement = () => (
  <Box sx={{ p: 3 }}>
    <Typography variant="h4" gutterBottom>User Management</Typography>
    <Typography variant="body1">Content for managing users (list, edit, delete) will go here.</Typography>
    {/* Implement user listing, adding, editing, deleting based on your backend */}
  </Box>
);
const OrderManagement = () => (
  <Box sx={{ p: 3 }}>
    <Typography variant="h4" gutterBottom>Order Management</Typography>
    <Typography variant="body1">Content for viewing and updating order details will go here.</Typography>
    {/* Implement order listing, viewing details, updating status */}
  </Box>
);

// --- Simplified Authentication/Authorization Check ---
// In a real app, this would involve validating a JWT token
// from localStorage/cookies with your backend for security.
const isAuthenticated = () => {
  const token = localStorage.getItem('authToken');
  return !!token; // Returns true if a token exists
};

const isAdmin = () => {
    const userRole = localStorage.getItem('userRole');
    return userRole === 'admin'; // Checks if the stored role is 'admin'
};
// ---------------------------------------------------

function AdminPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [drawerOpen, setDrawerOpen] = useState(false); // Can be used for a responsive/mobile drawer

  useEffect(() => {
    // Redirect if not authenticated or not an admin
    if (!isAuthenticated() || !isAdmin()) {
      navigate('/login', { replace: true }); // Redirect to login page
    }
  }, [navigate]); // Dependency array ensures this runs on component mount

  const handleLogout = () => {
    localStorage.removeItem('authToken'); // Clear authentication token
    localStorage.removeItem('userRole'); // Clear user role
    navigate('/login'); // Redirect to login page after logout
  };

  // Menu items for the sidebar navigation
  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/admin/dashboard' },
    { text: 'Users', icon: <PeopleIcon />, path: '/admin/users' },
    { text: 'Products', icon: <CategoryIcon />, path: '/admin/products' },
    { text: 'Orders', icon: <ShoppingCartIcon />, path: '/admin/orders' }, // New Order Management link
  ];

  // If not authenticated or not admin, render nothing (or a loading/unauthorized message)
  if (!isAuthenticated() || !isAdmin()) {
    return null; // The useEffect will handle redirection
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Admin Panel
          </Typography>
          <Button color="inherit" onClick={handleLogout} startIcon={<ExitToAppIcon />}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      {/* Permanent Drawer for Desktop */}
      <Drawer
        variant="permanent"
        sx={{
          width: 240,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: 240, boxSizing: 'border-box' },
        }}
      >
        <Toolbar /> {/* This creates space for the AppBar */}
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {menuItems.map((item) => (
              <ListItem
                button
                key={item.text}
                component={Link}
                to={item.path}
                // Highlight selected item in sidebar
                selected={location.pathname.startsWith(item.path) || (location.pathname === '/admin' && item.path === '/admin/dashboard')}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
      {/* Main Content Area */}
      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
        {/* Nested Routes for Admin Sections */}
        <Routes>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="products" element={<ProductManagement />} />
          <Route path="orders" element={<OrderManagement />} /> {/* New route for Order Management */}
          <Route index element={<AdminDashboard />} /> {/* Default route for /admin */}
        </Routes>
      </Box>
    </Box>
  );
}

export default AdminPage;
