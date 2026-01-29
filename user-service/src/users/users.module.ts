import { Module } from '@nestjs/common';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UserEventsService } from './services/user-events.service';

@Module({
  imports: [
    RabbitMQModule.forRoot({
      uri: 'amqp://guest:guest@rabbitmq:5672',
      exchanges: [
        {
          name: 'user.events',
          type: 'topic',
        },
      ],
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService, UserEventsService],
  exports: [UsersService],
})
export class UsersModule {}
