const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const paymentRoutes = require('./routes/paymentRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/payments', paymentRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', service: 'payment-service' });
});

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Payment Service: Connected to MongoDB');
    app.listen(process.env.PORT, () => {
      console.log(`Payment Service running on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.error('Payment Service: MongoDB connection error:', error);
    process.exit(1);
  });

