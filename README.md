# DDD CQRS Sample Application

A sample Node.js application demonstrating **Clean Architecture**, **Domain-Driven Design (DDD)**, and **CQRS** (Command Query Responsibility Segregation) patterns with a clear folder structure and abstractions.

## 🏗️ Architecture Overview

This application is organized following Clean Architecture principles with clear separation of concerns across multiple layers:

### Architecture Layers

```
┌─────────────────────────────────────────────────────────────┐
│                        API Layer                             │
│  (Controllers, Routes, HTTP handling)                        │
├─────────────────────────────────────────────────────────────┤
│                    Application Layer                         │
│  (Commands, Queries, Handlers - CQRS)                       │
├─────────────────────────────────────────────────────────────┤
│                     Domain Layer                             │
│  (Entities, Value Objects, Domain Events)                   │
├─────────────────────────────────────────────────────────────┤
│                  Infrastructure Layer                        │
│  (Repositories, Event Bus, External Services)               │
└─────────────────────────────────────────────────────────────┘
```

### 1. **Domain Layer** (`src/domain/`)
The core business logic layer - technology-agnostic and contains:
- **Entities**: Business objects with identity (e.g., `User.js`)
- **Value Objects**: Immutable objects without identity (e.g., `Email.js`)
- **Domain Events**: Events that represent something that happened in the domain (e.g., `UserCreatedEvent.js`)

### 2. **Application Layer** (`src/application/`)
Contains application-specific business rules and implements CQRS:
- **Commands**: Represent intent to modify state (e.g., `CreateUserCommand.js`)
- **Command Handlers**: Execute commands and modify state
- **Queries**: Represent intent to retrieve data (e.g., `GetUserByIdQuery.js`)
- **Query Handlers**: Execute queries and return data without side effects

### 3. **Infrastructure Layer** (`src/infrastructure/`)
Contains implementations of external concerns:
- **Repositories**: Data access implementations (e.g., `InMemoryUserRepository.js`)
- **Event Bus**: Event-driven communication system
- **Event Handlers**: Respond to domain events

### 4. **API Layer** (`src/api/`)
The presentation layer that handles HTTP:
- **Controllers**: Handle HTTP requests and responses
- **Routes**: Define HTTP endpoints
- **Container**: Dependency injection container

## 🎯 Design Patterns Implemented

### CQRS (Command Query Responsibility Segregation)
- **Commands** modify state and return void or the modified entity
- **Queries** return data without modifying state
- Clear separation between read and write operations

### Event-Driven Architecture
- Domain events are published when significant domain actions occur
- Event handlers respond to these events asynchronously
- Loose coupling between components

### Repository Pattern
- Abstracts data access logic
- Domain layer doesn't depend on specific database implementation
- Easy to swap implementations (in-memory → SQL → NoSQL)

### Dependency Injection
- All dependencies are injected through constructors
- Central container manages object composition
- Testable and maintainable code

## 📁 Project Structure

```
Capstone_Moringa/
├── src/
│   ├── domain/                    # Domain Layer
│   │   ├── entities/
│   │   │   └── User.js           # User entity
│   │   ├── value-objects/
│   │   │   └── Email.js          # Email value object
│   │   └── events/
│   │       ├── UserCreatedEvent.js
│   │       └── UserUpdatedEvent.js
│   │
│   ├── application/               # Application Layer (CQRS)
│   │   ├── commands/
│   │   │   ├── CreateUserCommand.js
│   │   │   ├── CreateUserCommandHandler.js
│   │   │   ├── UpdateUserCommand.js
│   │   │   └── UpdateUserCommandHandler.js
│   │   └── queries/
│   │       ├── GetUserByIdQuery.js
│   │       ├── GetUserByIdQueryHandler.js
│   │       ├── GetAllUsersQuery.js
│   │       └── GetAllUsersQueryHandler.js
│   │
│   ├── infrastructure/            # Infrastructure Layer
│   │   ├── repositories/
│   │   │   └── InMemoryUserRepository.js
│   │   └── events/
│   │       ├── EventBus.js
│   │       └── handlers/
│   │           ├── UserCreatedEventHandler.js
│   │           └── UserUpdatedEventHandler.js
│   │
│   ├── api/                       # API Layer
│   │   ├── controllers/
│   │   │   └── UserController.js
│   │   ├── routes/
│   │   │   └── userRoutes.js
│   │   ├── container.js          # Dependency injection
│   │   └── server.js             # Express server
│   │
│   └── tests/
│       └── test.js                # Test suite
│
├── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/NjokiThuo/Capstone_Moringa.git
cd Capstone_Moringa
```

2. Install dependencies:
```bash
npm install
```

### Running the Application

Start the server:
```bash
npm start
```

The server will start on `http://localhost:3000`

For development with auto-reload (Node.js 18+):
```bash
npm run dev
```

### Running Tests

Execute the test suite:
```bash
npm test
```

## 📡 API Endpoints

### Health Check
```
GET /health
```
Returns the health status of the API.

### Create User (Command)
```
POST /api/users
Content-Type: application/json

{
  "email": "user@example.com",
  "name": "John Doe"
}
```

### Get All Users (Query)
```
GET /api/users
```

### Get User by ID (Query)
```
GET /api/users/:id
```

### Update User (Command)
```
PUT /api/users/:id
Content-Type: application/json

{
  "name": "Jane Doe"
}
```

## 🧪 Example Usage

### Using cURL

Create a user:
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","name":"John Doe"}'
```

Get all users:
```bash
curl http://localhost:3000/api/users
```

Update a user:
```bash
curl -X PUT http://localhost:3000/api/users/1234567890 \
  -H "Content-Type: application/json" \
  -d '{"name":"John Smith"}'
```

## 🔍 Key Concepts Demonstrated

### Bounded Context
The application is organized around the **User** bounded context, which encapsulates all user-related functionality.

### Command vs Query
- **Commands** (CreateUser, UpdateUser): Change state, may publish events
- **Queries** (GetUserById, GetAllUsers): Read data, no side effects

### Event-Driven Pattern
When a user is created or updated:
1. The command handler executes the business logic
2. A domain event is published to the event bus
3. Event handlers respond asynchronously (e.g., logging, notifications)

### Dependency Flow
- Domain layer has no dependencies
- Application layer depends only on domain
- Infrastructure implements interfaces defined in application
- API layer orchestrates everything through dependency injection

## 🛠️ Technology Stack

- **Node.js**: Runtime environment
- **Express.js**: Web framework
- **Native EventEmitter**: Event-driven pattern

## 📚 Further Reading

- [Domain-Driven Design by Eric Evans](https://www.domainlanguage.com/ddd/)
- [Clean Architecture by Robert C. Martin](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- [CQRS Pattern](https://martinfowler.com/bliki/CQRS.html)

## 📄 License

This project is licensed under the MIT License.