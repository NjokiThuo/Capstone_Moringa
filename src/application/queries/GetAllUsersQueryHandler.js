/**
 * GetAllUsersQueryHandler
 * Handles the GetAllUsersQuery - returns data without modifying state
 */
class GetAllUsersQueryHandler {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async handle(query) {
    return await this.userRepository.findAll();
  }
}

module.exports = GetAllUsersQueryHandler;
