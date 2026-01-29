import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  // Create HTTP app
  const app = await NestFactory.create(AppModule);
  
  app.enableCors();
  
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  
  // Swagger
  const config = new DocumentBuilder()
    .setTitle('DifNailart User Service API')
    .setDescription('User management service for nail art booking system')
    .setVersion('1.0')
    .addTag('users')
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  
  // Connect to RabbitMQ as microservice
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://rabbitmq:5672'],
      queue: 'user_service_queue',
      queueOptions: {
        durable: false,
      },
    },
  });
  
  // Start all microservices
  await app.startAllMicroservices();
  
  // Start HTTP server
  await app.listen(3001);
  
  console.log(`🚀 User Service running on: ${await app.getUrl()}`);
  console.log(`📡 Microservice listening on RabbitMQ`);
}

bootstrap();