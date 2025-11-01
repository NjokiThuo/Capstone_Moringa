/**
 * Simple Test Suite
 * Tests the CQRS pattern implementation
 */

// Domain
const User = require('../domain/entities/User');
const Email = require('../domain/value-objects/Email');

// Infrastructure
const InMemoryUserRepository = require('../infrastructure/repositories/InMemoryUserRepository');
const EventBus = require('../infrastructure/events/EventBus');

// Application
const CreateUserCommandHandler = require('../application/commands/CreateUserCommandHandler');
const UpdateUserCommandHandler = require('../application/commands/UpdateUserCommandHandler');
const GetUserByIdQueryHandler = require('../application/queries/GetUserByIdQueryHandler');
const GetAllUsersQueryHandler = require('../application/queries/GetAllUsersQueryHandler');
const CreateUserCommand = require('../application/commands/CreateUserCommand');
const UpdateUserCommand = require('../application/commands/UpdateUserCommand');
const GetUserByIdQuery = require('../application/queries/GetUserByIdQuery');
const GetAllUsersQuery = require('../application/queries/GetAllUsersQuery');

// Test utilities
function assert(condition, message) {
  if (!condition) {
    throw new Error(`Assertion failed: ${message}`);
  }
}

async function runTests() {
  console.log('Starting tests...\n');
  let testsPassed = 0;
  let testsFailed = 0;

  // Test 1: Email Value Object
  try {
    console.log('Test 1: Email Value Object validation');
    const validEmail = new Email('test@example.com');
    assert(validEmail.toString() === 'test@example.com', 'Valid email should be accepted');
    
    try {
      new Email('invalid-email');
      assert(false, 'Invalid email should throw error');
    } catch (e) {
      assert(e.message === 'Invalid email format', 'Should throw correct error message');
    }
    
    console.log('✓ Test 1 passed\n');
    testsPassed++;
  } catch (error) {
    console.log('✗ Test 1 failed:', error.message, '\n');
    testsFailed++;
  }

  // Test 2: User Entity
  try {
    console.log('Test 2: User Entity');
    const user = new User('1', 'test@example.com', 'John Doe');
    assert(user.id === '1', 'User ID should match');
    assert(user.name === 'John Doe', 'User name should match');
    
    user.updateName('Jane Doe');
    assert(user.name === 'Jane Doe', 'User name should be updated');
    
    console.log('✓ Test 2 passed\n');
    testsPassed++;
  } catch (error) {
    console.log('✗ Test 2 failed:', error.message, '\n');
    testsFailed++;
  }

  // Test 3: Repository
  try {
    console.log('Test 3: Repository operations');
    const repo = new InMemoryUserRepository();
    const user = new User('1', 'test@example.com', 'John Doe');
    
    await repo.save(user);
    const foundUser = await repo.findById('1');
    assert(foundUser !== null, 'User should be found by ID');
    assert(foundUser.name === 'John Doe', 'Retrieved user should have correct name');
    
    const foundByEmail = await repo.findByEmail('test@example.com');
    assert(foundByEmail !== null, 'User should be found by email');
    
    console.log('✓ Test 3 passed\n');
    testsPassed++;
  } catch (error) {
    console.log('✗ Test 3 failed:', error.message, '\n');
    testsFailed++;
  }

  // Test 4: Event Bus
  try {
    console.log('Test 4: Event Bus');
    const eventBus = new EventBus();
    let eventReceived = false;
    
    eventBus.subscribe('TestEvent', (event) => {
      eventReceived = true;
    });
    
    await eventBus.publish({ eventType: 'TestEvent', data: 'test' });
    assert(eventReceived, 'Event should be received by subscriber');
    assert(eventBus.getEventLog().length === 1, 'Event should be logged');
    
    console.log('✓ Test 4 passed\n');
    testsPassed++;
  } catch (error) {
    console.log('✗ Test 4 failed:', error.message, '\n');
    testsFailed++;
  }

  // Test 5: Command Handler (Create User)
  try {
    console.log('Test 5: Create User Command Handler');
    const repo = new InMemoryUserRepository();
    const eventBus = new EventBus();
    const handler = new CreateUserCommandHandler(repo, eventBus);
    
    const command = new CreateUserCommand('newuser@example.com', 'New User');
    const user = await handler.handle(command);
    
    assert(user !== null, 'User should be created');
    assert(user.email === 'newuser@example.com', 'User email should match');
    assert(user.name === 'New User', 'User name should match');
    assert(eventBus.getEventLog().length === 1, 'UserCreated event should be published');
    
    console.log('✓ Test 5 passed\n');
    testsPassed++;
  } catch (error) {
    console.log('✗ Test 5 failed:', error.message, '\n');
    testsFailed++;
  }

  // Test 6: Command Handler (Update User)
  try {
    console.log('Test 6: Update User Command Handler');
    const repo = new InMemoryUserRepository();
    const eventBus = new EventBus();
    const user = new User('1', 'test@example.com', 'Original Name');
    await repo.save(user);
    
    const handler = new UpdateUserCommandHandler(repo, eventBus);
    const command = new UpdateUserCommand('1', 'Updated Name');
    const updatedUser = await handler.handle(command);
    
    assert(updatedUser.name === 'Updated Name', 'User name should be updated');
    assert(eventBus.getEventLog().length === 1, 'UserUpdated event should be published');
    
    console.log('✓ Test 6 passed\n');
    testsPassed++;
  } catch (error) {
    console.log('✗ Test 6 failed:', error.message, '\n');
    testsFailed++;
  }

  // Test 7: Query Handler (Get User by ID)
  try {
    console.log('Test 7: Get User by ID Query Handler');
    const repo = new InMemoryUserRepository();
    const user = new User('1', 'test@example.com', 'John Doe');
    await repo.save(user);
    
    const handler = new GetUserByIdQueryHandler(repo);
    const query = new GetUserByIdQuery('1');
    const foundUser = await handler.handle(query);
    
    assert(foundUser !== null, 'User should be found');
    assert(foundUser.name === 'John Doe', 'Retrieved user should have correct name');
    
    console.log('✓ Test 7 passed\n');
    testsPassed++;
  } catch (error) {
    console.log('✗ Test 7 failed:', error.message, '\n');
    testsFailed++;
  }

  // Test 8: Query Handler (Get All Users)
  try {
    console.log('Test 8: Get All Users Query Handler');
    const repo = new InMemoryUserRepository();
    await repo.save(new User('1', 'user1@example.com', 'User One'));
    await repo.save(new User('2', 'user2@example.com', 'User Two'));
    
    const handler = new GetAllUsersQueryHandler(repo);
    const query = new GetAllUsersQuery();
    const users = await handler.handle(query);
    
    assert(users.length === 2, 'Should retrieve all users');
    
    console.log('✓ Test 8 passed\n');
    testsPassed++;
  } catch (error) {
    console.log('✗ Test 8 failed:', error.message, '\n');
    testsFailed++;
  }

  // Summary
  console.log('=================================');
  console.log(`Tests completed: ${testsPassed + testsFailed}`);
  console.log(`Tests passed: ${testsPassed}`);
  console.log(`Tests failed: ${testsFailed}`);
  console.log('=================================');

  if (testsFailed > 0) {
    process.exit(1);
  }
}

// Run tests
runTests().catch(error => {
  console.error('Test execution failed:', error);
  process.exit(1);
});
