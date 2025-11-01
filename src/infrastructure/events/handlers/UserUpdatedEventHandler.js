/**
 * UserUpdatedEventHandler
 * Example event handler that responds to UserUpdated events
 */
class UserUpdatedEventHandler {
  handle(event) {
    console.log(`[UserUpdatedEventHandler] User ${event.userId} updated: ${event.previousName} -> ${event.newName}`);
    // In production, this could:
    // - Send a notification
    // - Create an audit log entry
    // - Update search indices
  }
}

module.exports = UserUpdatedEventHandler;
