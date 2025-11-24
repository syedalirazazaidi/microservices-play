const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
// Load environment variables - try .env first, fallback to config.env
const fs = require('fs');
const envPath = fs.existsSync('.env') ? '.env' : 'config.env';
require('dotenv').config({ path: envPath });

const { buildMongoUri } = require('./utils/dbConfig');
const productRoutes = require('./routes/productRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/products', productRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', service: 'product-service' });
});

// Connect to MongoDB
mongoose
  .connect(buildMongoUri('productdb'))
  .then(() => {
    console.log('Product Service: Connected to MongoDB');
    app.listen(process.env.PORT, () => {
      console.log(`Product Service running on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.error('Product Service: MongoDB connection error:', error);
    process.exit(1);
  });

