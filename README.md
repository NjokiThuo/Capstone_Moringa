## 🚀 Getting Started

### Prerequisites
- Node.js v14
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
