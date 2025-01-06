const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

// Import routes
const cartRoutes = require('./cart');
const loginRoutes = require('./login');
const registerRoutes = require('./register');
const orderRoutes = require('./order');

// Middleware to parse JSON request bodies
app.use(express.json());

// Use the routes for the corresponding paths
app.use('/api/cart', cartRoutes);   // Cart routes
app.use('/api/login', loginRoutes);   // Login routes
app.use('/api/register', registerRoutes);   // Register routes
app.use('/api/order', orderRoutes); // Order routes

// Start the server
app.listen(PORT, () => {
  console.log(`API server is running on port ${PORT}`);
});