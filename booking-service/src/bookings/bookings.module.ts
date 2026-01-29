import { Module } from '@nestjs/common';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { BookingsController } from './bookings.controller';
import { BookingsService } from './bookings.service';
import { UserCreatedHandler } from './events/user-created.handler';
import { BookingEventsHandler } from './events/booking-events.handler';

@Module({
  imports: [
    // Import RabbitMQModule untuk menyediakan AmqpConnection
    RabbitMQModule.forRootAsync(RabbitMQModule, {
      useFactory: () => ({
        exchanges: [
          { name: 'user.events', type: 'topic' },
          { name: 'booking.events', type: 'topic' },
        ],
        uri: 'amqp://rabbitmq:5672',
        connectionInitOptions: { wait: false },
      }),
    }),
  ],
  controllers: [BookingsController],
  providers: [BookingsService, UserCreatedHandler, BookingEventsHandler],
  exports: [BookingsService],
})
export class BookingsModule {}