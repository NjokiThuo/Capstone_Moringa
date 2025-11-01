const CreateUserCommand = require('../../application/commands/CreateUserCommand');
const UpdateUserCommand = require('../../application/commands/UpdateUserCommand');
const GetUserByIdQuery = require('../../application/queries/GetUserByIdQuery');
const GetAllUsersQuery = require('../../application/queries/GetAllUsersQuery');

/**
 * UserController - API Layer
 * Handles HTTP requests and delegates to application layer
 */
class UserController {
  constructor(createUserHandler, updateUserHandler, getUserByIdHandler, getAllUsersHandler) {
    this.createUserHandler = createUserHandler;
    this.updateUserHandler = updateUserHandler;
    this.getUserByIdHandler = getUserByIdHandler;
    this.getAllUsersHandler = getAllUsersHandler;
  }

  /**
   * POST /users - Create a new user (Command)
   */
  async createUser(req, res) {
    try {
      const { email, name } = req.body;
      
      if (!email || !name) {
        return res.status(400).json({ error: 'Email and name are required' });
      }

      const command = new CreateUserCommand(email, name);
      const user = await this.createUserHandler.handle(command);
      
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  /**
   * PUT /users/:id - Update a user (Command)
   */
  async updateUser(req, res) {
    try {
      const { id } = req.params;
      const { name } = req.body;
      
      if (!name) {
        return res.status(400).json({ error: 'Name is required' });
      }

      const command = new UpdateUserCommand(id, name);
      const user = await this.updateUserHandler.handle(command);
      
      res.status(200).json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  /**
   * GET /users/:id - Get a user by ID (Query)
   */
  async getUserById(req, res) {
    try {
      const { id } = req.params;
      const query = new GetUserByIdQuery(id);
      const user = await this.getUserByIdHandler.handle(query);
      
      res.status(200).json(user);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  /**
   * GET /users - Get all users (Query)
   */
  async getAllUsers(req, res) {
    try {
      const query = new GetAllUsersQuery();
      const users = await this.getAllUsersHandler.handle(query);
      
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = UserController;
