const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
// Load environment variables - try .env first, fallback to config.env
const fs = require('fs');
const envPath = fs.existsSync('.env') ? '.env' : 'config.env';
require('dotenv').config({ path: envPath });

const userRoutes = require('./routes/userRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/users', userRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', service: 'user-service' });
});

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('User Service: Connected to MongoDB');
    app.listen(process.env.PORT, () => {
      console.log(`User Service running on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.error('User Service: MongoDB connection error:', error);
    process.exit(1);
  });

