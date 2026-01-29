#!/bin/bash

echo "🔧 Final Fix..."

# 1. Stop everything
docker-compose down

# 2. Fix booking-service package.json
echo "Fixing booking-service package.json..."
cd booking-service

# Backup
cp package.json package.json.backup

# Create correct package.json
cat > package.json << 'EOF'
{
  "name": "booking-service",
  "version": "0.0.1",
  "description": "",
  "author": "",
  "private": true,
  "license": "UNLICENSED",
  "scripts": {
    "build": "nest build",
    "start": "node dist/main",
    "start:dev": "nest start --watch",
    "start:prod": "node dist/main"
  },
  "dependencies": {
    "@nestjs/common": "10.4.22",
    "@nestjs/core": "10.4.22",
    "@nestjs/microservices": "10.4.22",
    "@nestjs/platform-express": "10.4.22",
    "amqp-connection-manager": "^4.1.14",
    "amqplib": "^0.10.3",
    "class-transformer": "^0.5.1",
    "class-validator": "^0.14.0",
    "reflect-metadata": "^0.1.13",
    "rxjs": "^7.8.0"
  }
}
EOF

cd ..

# 3. Fix user-service main.ts (simplify)
echo "Simplifying user-service main.ts..."
cat > user-service/src/main.ts << 'EOF'
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3001);
  console.log("✅ User Service running on port 3001");
}
bootstrap();
EOF

# 4. Remove problematic filter temporarily
rm -f user-service/src/common/filters/validation.filter.ts

# 5. Rebuild
echo "Rebuilding..."
docker-compose build --no-cache

# 6. Start
echo "Starting services..."
docker-compose up -d

# 7. Wait and test
sleep 15
echo "Testing..."
curl -s http://localhost:3001/ && echo "✅ User Service OK"
curl -s http://localhost:3002/bookings/services && echo "✅ Booking Service OK"

echo "🎉 Done!"