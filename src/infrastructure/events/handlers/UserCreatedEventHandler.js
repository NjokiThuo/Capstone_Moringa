/**
 * UserCreatedEventHandler
 * Example event handler that responds to UserCreated events
 * In a real application, this might send welcome emails, create audit logs, etc.
 */
class UserCreatedEventHandler {
  handle(event) {
    console.log(`[UserCreatedEventHandler] User created: ${event.name} (${event.email})`);
    // In production, this could:
    // - Send a welcome email
    // - Create an audit log entry
    // - Update analytics
    // - Trigger other domain events
  }
}

module.exports = UserCreatedEventHandler;
