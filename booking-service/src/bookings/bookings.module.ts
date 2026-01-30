import { Module } from '@nestjs/common';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';

@Module({
  imports: [
    RabbitMQModule.forRootAsync({
      useFactory: () => ({
        uri: process.env.RABBITMQ_URL || 'amqp://localhost:5672',
        exchanges: [
          {
            name: 'booking.events',
            type: 'topic',
          },
        ],
      }),
    }),
  ],
})
export class BookingsModule {}
