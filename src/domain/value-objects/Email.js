/**
 * Email Value Object
 * Encapsulates email validation logic
 */
class Email {
  constructor(value) {
    if (!this.isValid(value)) {
      throw new Error('Invalid email format');
    }
    this.value = value.toLowerCase();
  }

  isValid(email) {
    // Simple email validation to avoid ReDoS vulnerabilities
    // Uses a more restrictive pattern that is safe from catastrophic backtracking
    if (!email || typeof email !== 'string') {
      return false;
    }
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }

  toString() {
    return this.value;
  }

  equals(other) {
    return other instanceof Email && other.value === this.value;
  }
}

module.exports = Email;
