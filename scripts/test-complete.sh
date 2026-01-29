#!/bin/bash

echo "🧪 Complete System Test"

echo -e "\n1. Testing Services:"
echo "User Service:" 
curl -s http://localhost:3001/ | jq .

echo -e "\nBooking Service:"
curl -s http://localhost:3002/bookings/services | jq .

echo -e "\n2. Testing Swagger Docs:"
echo "User Service API Docs: http://localhost:3001/api"
curl -s -o /dev/null -w "Status: %{http_code}\n" http://localhost:3001/api
echo "Booking Service API Docs: http://localhost:3002/api"
curl -s -o /dev/null -w "Status: %{http_code}\n" http://localhost:3002/api

echo -e "\n3. Testing Validation (User Registration):"
echo "Invalid email:"
curl -X POST http://localhost:3001/users/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"invalid","password":"123"}' \
  -w "\nStatus: %{http_code}\n" -s | jq .

echo -e "\nValid registration:"
curl -X POST http://localhost:3001/users/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"Password123!"}' \
  -w "\nStatus: %{http_code}\n" -s | jq .

echo -e "\n4. Testing Validation (Booking):"
echo "Invalid date format:"
curl -X POST http://localhost:3002/bookings \
  -H "Content-Type: application/json" \
  -d '{"userId":1,"serviceId":2,"bookingDate":"2024/12/25","bookingTime":"14:00"}' \
  -w "\nStatus: %{http_code}\n" -s | jq .

echo -e "\n✅ Test complete"