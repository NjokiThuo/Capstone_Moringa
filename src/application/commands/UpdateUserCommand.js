/**
 * UpdateUserCommand - Command
 * Represents the intent to update a user's name
 */
class UpdateUserCommand {
  constructor(userId, newName) {
    this.userId = userId;
    this.newName = newName;
  }
}

module.exports = UpdateUserCommand;
