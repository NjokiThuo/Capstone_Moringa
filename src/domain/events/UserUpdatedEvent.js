/**
 * UserUpdatedEvent - Domain Event
 * Published when a user is updated
 */
class UserUpdatedEvent {
  constructor(userId, previousName, newName, timestamp = new Date()) {
    this.eventType = 'UserUpdated';
    this.userId = userId;
    this.previousName = previousName;
    this.newName = newName;
    this.timestamp = timestamp;
  }
}

module.exports = UserUpdatedEvent;
