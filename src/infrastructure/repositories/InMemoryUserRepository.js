/**
 * InMemoryUserRepository - Infrastructure
 * Implementation of user repository using in-memory storage
 * In production, this would connect to a real database
 */
class InMemoryUserRepository {
  constructor() {
    this.users = new Map();
  }

  async save(user) {
    this.users.set(user.id, user);
    return user;
  }

  async findById(id) {
    return this.users.get(id) || null;
  }

  async findByEmail(email) {
    for (const user of this.users.values()) {
      if (user.email === email) {
        return user;
      }
    }
    return null;
  }

  async findAll() {
    return Array.from(this.users.values());
  }

  async delete(id) {
    return this.users.delete(id);
  }
}

module.exports = InMemoryUserRepository;
