const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
// Load environment variables - try .env first, fallback to config.env
const fs = require('fs');
const envPath = fs.existsSync('.env') ? '.env' : 'config.env';
require('dotenv').config({ path: envPath });

const cartRoutes = require('./routes/cartRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/cart', cartRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', service: 'cart-service' });
});

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Cart Service: Connected to MongoDB');
    app.listen(process.env.PORT, () => {
      console.log(`Cart Service running on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.error('Cart Service: MongoDB connection error:', error);
    process.exit(1);
  });

