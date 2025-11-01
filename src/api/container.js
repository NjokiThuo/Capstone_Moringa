// Infrastructure
const InMemoryUserRepository = require('../infrastructure/repositories/InMemoryUserRepository');
const EventBus = require('../infrastructure/events/EventBus');
const UserCreatedEventHandler = require('../infrastructure/events/handlers/UserCreatedEventHandler');
const UserUpdatedEventHandler = require('../infrastructure/events/handlers/UserUpdatedEventHandler');

// Application - Commands
const CreateUserCommandHandler = require('../application/commands/CreateUserCommandHandler');
const UpdateUserCommandHandler = require('../application/commands/UpdateUserCommandHandler');

// Application - Queries
const GetUserByIdQueryHandler = require('../application/queries/GetUserByIdQueryHandler');
const GetAllUsersQueryHandler = require('../application/queries/GetAllUsersQueryHandler');

// API
const UserController = require('./controllers/UserController');

/**
 * Dependency Injection Container
 * Composes all application dependencies
 */
class Container {
  constructor() {
    // Infrastructure layer
    this.userRepository = new InMemoryUserRepository();
    this.eventBus = new EventBus();

    // Register event handlers
    this.setupEventHandlers();

    // Application layer - Command handlers
    this.createUserCommandHandler = new CreateUserCommandHandler(
      this.userRepository,
      this.eventBus
    );
    this.updateUserCommandHandler = new UpdateUserCommandHandler(
      this.userRepository,
      this.eventBus
    );

    // Application layer - Query handlers
    this.getUserByIdQueryHandler = new GetUserByIdQueryHandler(this.userRepository);
    this.getAllUsersQueryHandler = new GetAllUsersQueryHandler(this.userRepository);

    // API layer
    this.userController = new UserController(
      this.createUserCommandHandler,
      this.updateUserCommandHandler,
      this.getUserByIdQueryHandler,
      this.getAllUsersQueryHandler
    );
  }

  setupEventHandlers() {
    const userCreatedHandler = new UserCreatedEventHandler();
    const userUpdatedHandler = new UserUpdatedEventHandler();

    this.eventBus.subscribe('UserCreated', (event) => userCreatedHandler.handle(event));
    this.eventBus.subscribe('UserUpdated', (event) => userUpdatedHandler.handle(event));
  }

  getUserController() {
    return this.userController;
  }

  getEventBus() {
    return this.eventBus;
  }
}

module.exports = Container;
