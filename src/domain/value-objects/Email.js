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
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
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
