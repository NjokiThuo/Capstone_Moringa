const express = require('express');

/**
 * User Routes
 * Defines HTTP endpoints for user operations
 */
function createUserRoutes(userController) {
  const router = express.Router();

  // Command endpoints (modify state)
  router.post('/users', (req, res) => userController.createUser(req, res));
  router.put('/users/:id', (req, res) => userController.updateUser(req, res));

  // Query endpoints (read data)
  router.get('/users', (req, res) => userController.getAllUsers(req, res));
  router.get('/users/:id', (req, res) => userController.getUserById(req, res));

  return router;
}

module.exports = createUserRoutes;
