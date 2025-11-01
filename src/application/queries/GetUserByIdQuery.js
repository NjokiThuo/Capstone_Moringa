/**
 * GetUserByIdQuery - Query
 * Represents the intent to retrieve a user by ID
 */
class GetUserByIdQuery {
  constructor(userId) {
    this.userId = userId;
  }
}

module.exports = GetUserByIdQuery;
