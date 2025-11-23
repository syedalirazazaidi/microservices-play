const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const orderRoutes = require('./routes/orderRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/orders', orderRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', service: 'order-service' });
});

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Order Service: Connected to MongoDB');
    app.listen(process.env.PORT, () => {
      console.log(`Order Service running on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.error('Order Service: MongoDB connection error:', error);
    process.exit(1);
  });

