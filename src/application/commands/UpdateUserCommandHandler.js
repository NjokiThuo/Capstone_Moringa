const UserUpdatedEvent = require('../../domain/events/UserUpdatedEvent');

/**
 * UpdateUserCommandHandler
 * Handles the UpdateUserCommand - modifies state
 */
class UpdateUserCommandHandler {
  constructor(userRepository, eventBus) {
    this.userRepository = userRepository;
    this.eventBus = eventBus;
  }

  async handle(command) {
    // Get user from repository
    const user = await this.userRepository.findById(command.userId);
    if (!user) {
      throw new Error('User not found');
    }

    const previousName = user.name;

    // Update user using domain logic
    user.updateName(command.newName);

    // Persist changes
    await this.userRepository.save(user);

    // Publish domain event
    const event = new UserUpdatedEvent(user.id, previousName, user.name);
    await this.eventBus.publish(event);

    return user;
  }
}

module.exports = UpdateUserCommandHandler;
