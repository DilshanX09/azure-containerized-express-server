/**
 * This file sets up the Express server, configures middleware, and defines routes for the application.
 * It also includes a health check endpoint to verify that the server is running properly. 
 * @Author: Chamod Dilshan
 * @abstract: This server serves as the backend for the user management system, handling API requests related to user operations.
 * @Date: 2026-02-10
 * @Version: 1.0
*/

const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 80;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const userRoute = require('./src/routes/user.route');

app.use('/api/users', userRoute);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/static/index.html'));
});

app.get('/health', (req, res) => {
  res
    .status(200)
    .json({
      status: 'HEALTHY',
      message: 'SERVER UP & RUNNING',
      timestamp: new Date().toISOString(), version: '1.0'
    });
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
}

module.exports = app;