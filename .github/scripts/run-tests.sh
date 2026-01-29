#!/bin/bash
# Test script for CI/CD pipeline

set -e  # Exit on error

echo "🧪 Starting CI/CD Tests..."

# Function to test service
test_service() {
    local service_name=$1
    local port=$2
    local endpoint=$3
    
    echo "Testing $service_name..."
    
    # Wait for service to be ready
    for i in {1..30}; do
        if curl -s "http://localhost:$port$endpoint" >/dev/null 2>&1; then
            echo "✅ $service_name is ready"
            return 0
        fi
        sleep 2
    done
    
    echo "❌ $service_name failed to start"
    return 1
}

# Start services
echo "Starting Docker Compose services..."
docker-compose up -d --build

# Wait for services to initialize
sleep 10

# Test each service
test_service "User Service" 3001 "/" || exit 1
test_service "Booking Service" 3002 "/bookings/services" || exit 1
test_service "Frontend" 8000 "/" || exit 1

# Test API endpoints
echo "Testing API endpoints..."

# Test user registration
echo "Testing user registration..."
curl -X POST http://localhost:3001/users/register \
  -H "Content-Type: application/json" \
  -d '{"name":"CI Test","email":"ci-test@example.com","password":"Test123!"}' \
  -f -s | grep -q "user.created" && echo "✅ User registration works" || echo "❌ User registration failed"

# Test booking services listing
echo "Testing services listing..."
curl -s http://localhost:3002/bookings/services | grep -q "services" && echo "✅ Services listing works" || echo "❌ Services listing failed"

echo "✅ All tests passed!"