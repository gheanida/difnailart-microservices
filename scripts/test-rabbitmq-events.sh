#!/bin/bash

echo "🧪 Testing RabbitMQ Event Communication..."

echo "1. Checking RabbitMQ Management UI..."
open http://localhost:15672 || echo "Open browser to http://localhost:15672"
echo "Username: guest"
echo "Password: guest"

echo -e "\n2. Creating a user (should trigger user.created event):"
USER_RESPONSE=$(curl -s -X POST http://localhost:3001/users/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Event Test User","email":"event-test@example.com","password":"Password123!"}')
echo "Response: $USER_RESPONSE"

# Extract user ID
USER_ID=$(echo $USER_RESPONSE | grep -o '"userId":[0-9]*' | cut -d: -f2)
echo "Created User ID: $USER_ID"

echo -e "\n3. Creating a booking (should trigger booking.created event):"
sleep 2
BOOKING_RESPONSE=$(curl -s -X POST http://localhost:3002/bookings \
  -H "Content-Type: application/json" \
  -d "{\"userId\":$USER_ID,\"serviceId\":2,\"bookingDate\":\"2024-12-25\",\"bookingTime\":\"14:00\"}")
echo "Response: $BOOKING_RESPONSE"

echo -e "\n4. Checking RabbitMQ queues:"
echo "Login to RabbitMQ UI at http://localhost:15672 and check:"
echo "   - Queues tab: Should see 'booking_user_created_queue' and 'booking_user_logged_in_queue'"
echo "   - Exchanges tab: Should see 'user.exchange' and 'booking.exchange'"
echo "   - Messages should be flowing"

echo -e "\n5. Checking service logs for events:"
echo "=== User Service Logs (should show event published) ==="
docker-compose logs user-service --tail=5 | grep -i "event\|publish"

echo -e "\n=== Booking Service Logs (should show event received) ==="
docker-compose logs booking-service --tail=5 | grep -i "event\|receive"

echo -e "\n✅ RabbitMQ Event Test Complete!"