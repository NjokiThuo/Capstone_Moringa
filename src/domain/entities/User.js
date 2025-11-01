/**
 * User Entity - Domain Model
 * Represents a user in our bounded context
 */
class User {
  constructor(id, email, name, createdAt = new Date()) {
    this.id = id;
    this.email = email;
    this.name = name;
    this.createdAt = createdAt;
  }

  /**
   * Update user name
   */
  updateName(newName) {
    if (!newName || newName.trim().length === 0) {
      throw new Error('Name cannot be empty');
    }
    this.name = newName;
  }

  /**
   * Get user display name
   */
  getDisplayName() {
    return `${this.name} (${this.email})`;
  }
}

module.exports = User;
