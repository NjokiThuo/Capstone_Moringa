/**
 * GetUserByIdQueryHandler
 * Handles the GetUserByIdQuery - returns data without modifying state
 */
class GetUserByIdQueryHandler {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async handle(query) {
    const user = await this.userRepository.findById(query.userId);
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }
}

module.exports = GetUserByIdQueryHandler;
