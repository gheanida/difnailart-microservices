#!/bin/bash

echo "🧪 Testing Frontend Integration..."

echo "1. Building Laravel frontend..."
docker-compose build laravel-frontend

echo "2. Starting frontend..."
docker-compose up laravel-frontend -d

sleep 10

echo "3. Testing frontend accessibility..."
curl -s http://localhost:8000 | grep -q "DifNailart" && echo "✅ Frontend is running" || echo "❌ Frontend not accessible"

echo "4. Testing API endpoints from frontend container..."
docker exec difnailart-frontend curl -s http://user-service:3001/ | grep -q "user-service" && echo "✅ Can reach User Service" || echo "❌ Cannot reach User Service"
docker exec difnailart-frontend curl -s http://booking-service:3002/bookings/services | grep -q "services" && echo "✅ Can reach Booking Service" || echo "❌ Cannot reach Booking Service"

echo "5. Open browser to test:"
echo "   - Frontend: http://localhost:8000"
echo "   - Login: http://localhost:8000/login"
echo "   - Registration: http://localhost:8000/register"
echo "   - Booking: http://localhost:8000/bookings"

echo "✅ Frontend integration test complete"