const User = require('../../domain/entities/User');
const Email = require('../../domain/value-objects/Email');
const UserCreatedEvent = require('../../domain/events/UserCreatedEvent');

/**
 * CreateUserCommandHandler
 * Handles the CreateUserCommand - modifies state
 */
class CreateUserCommandHandler {
  constructor(userRepository, eventBus) {
    this.userRepository = userRepository;
    this.eventBus = eventBus;
  }

  async handle(command) {
    // Validate email using value object
    const email = new Email(command.email);
    
    // Check if user already exists
    const existingUser = await this.userRepository.findByEmail(email.toString());
    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    // Generate ID (in real app, this would be more sophisticated)
    const userId = Date.now().toString();

    // Create domain entity
    const user = new User(userId, email.toString(), command.name);

    // Persist user
    await this.userRepository.save(user);

    // Publish domain event
    const event = new UserCreatedEvent(user.id, user.email, user.name);
    await this.eventBus.publish(event);

    return user;
  }
}

module.exports = CreateUserCommandHandler;
