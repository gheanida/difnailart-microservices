#!/bin/bash

echo "🧪 Testing Validation & DTO..."

echo -e "\n1. Testing User Registration Validation:"
echo "Test 1.1: Missing email"
curl -X POST http://localhost:3001/users/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John","password":"123"}' \
  -w "\nStatus: %{http_code}\n"

echo -e "\nTest 1.2: Invalid email format"
curl -X POST http://localhost:3001/users/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"invalid-email","password":"Password123!"}' \
  -w "\nStatus: %{http_code}\n"

echo -e "\nTest 1.3: Password too weak"
curl -X POST http://localhost:3001/users/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@example.com","password":"123"}' \
  -w "\nStatus: %{http_code}\n"

echo -e "\nTest 1.4: Valid registration"
curl -X POST http://localhost:3001/users/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"Password123!"}' \
  -w "\nStatus: %{http_code}\n"

echo -e "\n2. Testing Booking Validation:"
echo "Test 2.1: Missing serviceId"
curl -X POST http://localhost:3002/bookings \
  -H "Content-Type: application/json" \
  -d '{"userId":1,"bookingDate":"2024-12-25","bookingTime":"14:00"}' \
  -w "\nStatus: %{http_code}\n"

echo -e "\nTest 2.2: Invalid date format"
curl -X POST http://localhost:3002/bookings \
  -H "Content-Type: application/json" \
  -d '{"userId":1,"serviceId":2,"bookingDate":"25-12-2024","bookingTime":"14:00"}' \
  -w "\nStatus: %{http_code}\n"

echo -e "\nTest 2.3: Invalid time format"
curl -X POST http://localhost:3002/bookings \
  -H "Content-Type: application/json" \
  -d '{"userId":1,"serviceId":2,"bookingDate":"2024-12-25","bookingTime":"2:00 PM"}' \
  -w "\nStatus: %{http_code}\n"

echo -e "\nTest 2.4: Valid booking"
curl -X POST http://localhost:3002/bookings \
  -H "Content-Type: application/json" \
  -d '{"userId":1,"serviceId":2,"bookingDate":"2024-12-25","bookingTime":"14:00","notes":"Floral design please"}' \
  -w "\nStatus: %{http_code}\n"

echo -e "\n3. Testing Swagger Documentation:"
echo "User Service API Docs: http://localhost:3001/api"
echo "Booking Service API Docs: http://localhost:3002/api"

echo -e "\n✅ Validation test complete"