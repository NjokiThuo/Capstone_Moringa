#!/bin/bash

# Example script demonstrating the DDD CQRS API
# Start the server first with: npm start
# Then run this script in another terminal: bash example.sh

echo "==================================="
echo "DDD CQRS API Example"
echo "==================================="
echo

echo "1. Health Check"
echo "GET /health"
curl -s http://localhost:3000/health | jq '.'
echo
echo

echo "2. Create User - John Doe"
echo "POST /api/users"
USER1=$(curl -s -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","name":"John Doe"}')
echo $USER1 | jq '.'
USER1_ID=$(echo $USER1 | jq -r '.id')
echo
echo

echo "3. Create User - Jane Smith"
echo "POST /api/users"
USER2=$(curl -s -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"email":"jane@example.com","name":"Jane Smith"}')
echo $USER2 | jq '.'
USER2_ID=$(echo $USER2 | jq -r '.id')
echo
echo

echo "4. Get All Users (Query)"
echo "GET /api/users"
curl -s http://localhost:3000/api/users | jq '.'
echo
echo

echo "5. Get User by ID (Query)"
echo "GET /api/users/$USER1_ID"
curl -s http://localhost:3000/api/users/$USER1_ID | jq '.'
echo
echo

echo "6. Update User Name (Command)"
echo "PUT /api/users/$USER1_ID"
curl -s -X PUT http://localhost:3000/api/users/$USER1_ID \
  -H "Content-Type: application/json" \
  -d '{"name":"John Updated Doe"}' | jq '.'
echo
echo

echo "7. Verify Update (Query)"
echo "GET /api/users/$USER1_ID"
curl -s http://localhost:3000/api/users/$USER1_ID | jq '.'
echo
echo

echo "==================================="
echo "Example complete!"
echo "Check the server console to see event-driven logs"
echo "==================================="
