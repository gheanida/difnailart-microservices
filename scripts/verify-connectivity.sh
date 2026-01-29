#!/bin/bash

echo "🔗 Verifying Docker Network Connectivity..."

echo -e "\n1. Checking containers:"
docker-compose ps

echo -e "\n2. Testing network connectivity:"

echo "From User Service to RabbitMQ:"
docker exec user-service ping -c 2 rabbitmq 2>/dev/null && echo "✅ User → RabbitMQ: Connected" || echo "❌ User → RabbitMQ: Failed"

echo "From Booking Service to RabbitMQ:"
docker exec booking-service ping -c 2 rabbitmq 2>/dev/null && echo "✅ Booking → RabbitMQ: Connected" || echo "❌ Booking → RabbitMQ: Failed"

echo "From Frontend to User Service:"
docker exec difnailart-frontend curl -s http://user-service:3001/ >/dev/null && echo "✅ Frontend → User Service: Connected" || echo "❌ Frontend → User Service: Failed"

echo "From Frontend to Booking Service:"
docker exec difnailart-frontend curl -s http://booking-service:3002/bookings/services >/dev/null && echo "✅ Frontend → Booking Service: Connected" || echo "❌ Frontend → Booking Service: Failed"

echo -e "\n3. Testing external access:"
echo "RabbitMQ Management UI: http://localhost:15672 (guest/guest)"
curl -s http://localhost:15672 >/dev/null && echo "✅ RabbitMQ UI: Accessible" || echo "❌ RabbitMQ UI: Not accessible"

echo "User Service API: http://localhost:3001/"
curl -s http://localhost:3001/ | grep -q "user-service" && echo "✅ User Service: Accessible" || echo "❌ User Service: Not accessible"

echo "Booking Service API: http://localhost:3002/"
curl -s http://localhost:3002/ | grep -q "booking-service" && echo "✅ Booking Service: Accessible" || echo "❌ Booking Service: Not accessible"

echo "Frontend: http://localhost:8000"
curl -s http://localhost:8000 | grep -q "DifNailart" && echo "✅ Frontend: Accessible" || echo "❌ Frontend: Not accessible"

echo -e "\n4. Checking Docker network:"
docker network inspect difnailart-network --format='{{range .Containers}}{{.Name}} - {{.IPv4Address}}{{"\n"}}{{end}}'

echo -e "\n✅ Connectivity verification complete!"
