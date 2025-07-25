// server.js
import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

connectDB();

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Define your API routes (crucial to place these BEFORE static file serving for matching paths)
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
// ... other app.use for routes ...

// --- NEW: Serve Admin Frontend Static Files from 'client/build' ---
// This assumes your React admin app builds to SEStyleSync/client/build
const adminFrontendBuildPath = path.resolve(__dirname, '..', 'client', 'build');
app.use('/admin', express.static(adminFrontendBuildPath));

// Handle all /admin routes by serving the admin React app's index.html
// This is crucial for React Router within the admin app.
app.get('/admin/*', (req, res) => {
  res.sendFile(path.join(adminFrontendBuildPath, 'index.html'));
});



// ***************************************************************
// FINAL CORRECTED BLOCK: Serve static frontend files from the project root directory
// '__dirname' is 'server/', '..' goes up one level to 'SEStyleSync/' (your project root)
const frontendRootPath = path.resolve(__dirname, '..');
app.use(express.static(frontendRootPath));

// Serve index.html specifically for the root URL (http://localhost:5000/)
// This assumes you have an 'index.html' directly in your project root.
// Other HTML files like login.html, signup.html will be served directly by express.static
// (e.g., http://localhost:5000/login.html, http://localhost:5000/signup.html).
app.get('/', (req, res) => {
  res.sendFile(path.join(frontendRootPath, 'index.html'));
});

// IMPORTANT: Make sure you have REMOVED any `app.get('*', ...)` lines.
// This route is for Single Page Applications and is not suitable here.
// ***************************************************************

// Production deployment setup
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static(path.resolve('client', 'build')));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve('client', 'build', 'index.html'))
  );
} else {
  // This is for development, where React dev server handles frontend
  app.get('/', (req, res) => {
    res.send('API is running...');
  });
}

// Error handling middleware (if you have them)
// import { notFound, errorHandler } from './middleware/errorMiddleware.js';
// app.use(notFound);
// app.use(errorHandler);


// Define the port the server will listen on
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); // Removed .yellow.bold as 'colors' isn't guaranteed