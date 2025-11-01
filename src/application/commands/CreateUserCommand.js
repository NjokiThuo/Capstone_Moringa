/**
 * CreateUserCommand - Command
 * Represents the intent to create a new user
 */
class CreateUserCommand {
  constructor(email, name) {
    this.email = email;
    this.name = name;
  }
}

module.exports = CreateUserCommand;
