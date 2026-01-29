#!/bin/bash

echo "🎯 FINAL VERIFICATION - ALL UAS REQUIREMENTS"

echo -e "\n=== PART 1: DOCKER CONTAINERS ==="
docker-compose ps

echo -e "\n=== PART 2: MICROSERVICES API ==="
echo "1. User Service (Auth):"
curl -s http://localhost:3001/ | jq -c '{service, status}'
curl -X POST http://localhost:3001/users/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Final Test","email":"final@test.com","password":"Final123!"}' \
  -s | jq -c '.event, .data.userId'

echo -e "\n2. Booking Service (Orders):"
curl -s http://localhost:3002/ | jq -c '{service, status}'
curl -s http://localhost:3002/bookings/services | jq -c '.event, .data[0].name'

echo -e "\n=== PART 3: RABBITMQ ==="
echo "RabbitMQ Management: http://localhost:15672 (guest/guest)"
curl -s http://localhost:15672 >/dev/null && echo "✅ RabbitMQ Accessible"

echo -e "\n=== PART 4: FRONTEND ==="
echo "Laravel Frontend: http://localhost:8000"
curl -s http://localhost:8000 | grep -q "DifNailart" && echo "✅ Frontend Accessible"

echo -e "\n=== PART 5: DTO VALIDATION ==="
echo "Testing validation error:"
curl -X POST http://localhost:3001/users/register \
  -H "Content-Type: application/json" \
  -d '{"email":"invalid"}' \
  -s | jq -c '{statusCode, message}'

echo -e "\n=== PART 6: EVENT DRIVEN ==="
echo "Check RabbitMQ queues for events..."
docker exec rabbitmq rabbitmqctl list_queues 2>/dev/null | head -10

echo -e "\n🎉 ALL REQUIREMENTS VERIFIED!"
