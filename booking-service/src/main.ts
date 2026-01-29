import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
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
    .setTitle('DifNailart Booking Service API')
    .setDescription('Booking management service for nail art studio')
    .setVersion('1.0')
    .addTag('bookings')
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  
  // Connect to RabbitMQ as microservice
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://rabbitmq:5672'],
      queue: 'booking_service_queue',
      queueOptions: {
        durable: false,
      },
    },
  });
  
  await app.startAllMicroservices();
  await app.listen(3002);
  
  console.log(`🚀 Booking Service running on: ${await app.getUrl()}`);
  console.log(`📡 Microservice listening on RabbitMQ`);
}

bootstrap();