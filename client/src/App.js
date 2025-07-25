// client/src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from '@mui/material';
import Header from './components/Header';
import Footer from './components/Footer';

// Import the new ProductsPage component
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage'; // <-- Add this line
// import SingleProductPage from './pages/SingleProductPage';
// import LoginPage from './pages/LoginPage';
// ... other pages

function App() {
  return (
    <Router>
      <Header />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} /> {/* <-- Add this route */}
          {/* <Route path="/product/:id" element={<SingleProductPage />} /> */}
          {/* <Route path="/login" element={<LoginPage />} /> */}
          {/* ... add more routes */}
        </Routes>
      </Container>
      <Footer />
    </Router>
  );
}

export default App;