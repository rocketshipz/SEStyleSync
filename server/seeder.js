// server/seeder.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';

// Import your Mongoose models - ENSURE THESE FILE NAMES MATCH EXACTLY
import User from './models/User.js';       // Corrected path/filename
import Product from './models/Product.js'; // Corrected path/filename
import Order from './models/Order.js';     // Corrected path/filename

import connectDB from './config/db.js'; // Import your DB connection function
import products from './data/products.js'; // Import your sample product data

dotenv.config(); // Load environment variables from .env

connectDB(); // Connect to your database

const importData = async () => {
  try {
    // Clear existing data (optional, useful for fresh start)
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    // For seeding, let's create one dummy admin user if none exist,
    // or you can seed from a users.js file as per standard MERN setups.
    // Ensure password is HASHED in a real app, but for seeder, simple for now.
    const existingAdmin = await User.findOne({ email: 'admin@example.com' });
    let adminUser;

    if (existingAdmin) {
        adminUser = existingAdmin;
        console.log('Admin user already exists. Using existing admin.'.yellow);
    } else {
        adminUser = await User.create({
            name: 'Admin User',
            email: 'admin@example.com',
            password: 'password123', // NOTE: In a real app, this should be hashed. Your userModel's pre-save hook handles it.
            isAdmin: true,
        });
        console.log('Created new Admin User.'.green);
    }

    // Assign products to the admin user
    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser._id }; // Assign product to admin user
    });

    await Product.insertMany(sampleProducts);

    console.log('Data Imported!'.green.inverse);
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`.red.underline.bold); // Use error.message for clearer output
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log('Data Destroyed!'.red.inverse);
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`.red.underline.bold);
    process.exit(1);
  }
};

// Check command line arguments to decide whether to import or destroy
if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}