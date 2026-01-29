#!/bin/bash

echo "🧪 Testing RabbitMQ Communication..."

echo "1. Testing User Registration with Event Emission:"
USER_RESPONSE=$(curl -s -X POST http://localhost:3001/users/register \
  -H "Content-Type: application/json" \
  -d '{"name":"RabbitMQ Test","email":"rabbitmq@test.com","password":"Password123!"}')

echo "User Registration Response:"
echo $USER_RESPONSE | jq .

# Extract user ID
USER_ID=$(echo $USER_RESPONSE | jq -r '.data.userId // empty')
if [ ! -z "$USER_ID" ]; then
  echo -e "\n2. Checking RabbitMQ Management UI:"
  echo "Open: http://localhost:15672 (guest/guest)"
  echo "Check queues: user_created_queue, booking_user_created_queue"
  
  echo -e "\n3. Testing RPC communication:"
  echo "This should show in booking service logs if RPC is working"
  
  echo -e "\n4. Checking order logs via MessagePattern:"
  # We can add a test endpoint later to retrieve logs
  echo "Order logs should be created for user $USER_ID"
fi

echo -e "\n5. Checking service logs for events:"
echo "=== User Service Logs (last 5 lines) ==="
docker-compose logs user-service --tail=5 | grep -i "event\|publish\|rabbit"

echo -e "\n=== Booking Service Logs (last 5 lines) ==="
docker-compose logs booking-service --tail=5 | grep -i "event\|receive\|rabbit"

echo -e "\n✅ RabbitMQ Test Complete"