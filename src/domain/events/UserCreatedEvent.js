/**
 * UserCreatedEvent - Domain Event
 * Published when a new user is created
 */
class UserCreatedEvent {
  constructor(userId, email, name, timestamp = new Date()) {
    this.eventType = 'UserCreated';
    this.userId = userId;
    this.email = email;
    this.name = name;
    this.timestamp = timestamp;
  }
}

module.exports = UserCreatedEvent;
