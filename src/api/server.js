const express = require('express');
const Container = require('./container');
const createUserRoutes = require('./routes/userRoutes');

/**
 * Express Server Setup
 * Entry point for the API
 */

// Create Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Initialize dependency container
const container = new Container();

// Setup routes
const userRoutes = createUserRoutes(container.getUserController());
app.use('/api', userRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy', timestamp: new Date() });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'DDD CQRS Sample API',
    version: '1.0.0',
    endpoints: {
      health: 'GET /health',
      createUser: 'POST /api/users',
      getUser: 'GET /api/users/:id',
      getAllUsers: 'GET /api/users',
      updateUser: 'PUT /api/users/:id'
    }
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`\n=================================`);
  console.log(`Server running on port ${PORT}`);
  console.log(`API: http://localhost:${PORT}`);
  console.log(`Health: http://localhost:${PORT}/health`);
  console.log(`=================================\n`);
});

module.exports = app;
