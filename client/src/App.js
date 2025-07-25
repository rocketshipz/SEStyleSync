import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignUpPage';
import RequestOtpPage from './pages/RequestOTPPage';
import VerifyOtpPage from './pages/VerifyOTPPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import AdminPage from './pages/AdminPage/AdminPage'; // Admin main layout
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/forgot-password" element={<RequestOtpPage />} />
        <Route path="/verify-otp" element={<VerifyOtpPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />

        {/* Admin Route - Protected route and nested routes are handled within AdminPage */}
        {/* The '*' in path="/admin/*" allows AdminPage to handle its own sub-routes */}
        <Route path="/admin/*" element={<AdminPage />} />

        {/* Catch-all route for any undefined paths */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;
