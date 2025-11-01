const { EventEmitter } = require('events');

/**
 * EventBus - Infrastructure
 * Simple event-driven pattern implementation using Node.js EventEmitter
 */
class EventBus {
  constructor() {
    this.emitter = new EventEmitter();
    this.eventLog = [];
  }

  /**
   * Publish an event
   */
  async publish(event) {
    console.log(`[EventBus] Publishing event: ${event.eventType}`, event);
    this.eventLog.push(event);
    this.emitter.emit(event.eventType, event);
  }

  /**
   * Subscribe to an event type
   */
  subscribe(eventType, handler) {
    console.log(`[EventBus] Subscribing to event: ${eventType}`);
    this.emitter.on(eventType, handler);
  }

  /**
   * Get all published events (for debugging/auditing)
   */
  getEventLog() {
    return this.eventLog;
  }

  /**
   * Clear event log
   */
  clearEventLog() {
    this.eventLog = [];
  }
}

module.exports = EventBus;
