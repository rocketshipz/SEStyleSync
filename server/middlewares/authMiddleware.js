// server/middlewares/authMiddleware.js
import jwt from 'jsonwebtoken'; // Assuming you use jsonwebtoken
import asyncHandler from 'express-async-handler'; // If you use this
import User from '../models/User.js'; // Assuming User model is needed for protection

// Middleware to protect routes (ensure user is logged in)
const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from the token (excluding password)
      req.user = await User.findById(decoded.id).select('-password');

      next(); // Move to the next middleware/route handler
    } catch (error) {
      console.error(`Not authorized, token failed: ${error.message}`.red);
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

// Middleware for admin access
const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next(); // User is admin, proceed
  } else {
    res.status(403); // Forbidden
    throw new Error('Not authorized as an admin');
  }
};

// Export both functions as named exports
export { protect, admin };