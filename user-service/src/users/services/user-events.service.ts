import { Injectable } from '@nestjs/common';
import { RabbitRPC, RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { UserCreatedEvent } from '../services/user-created.event';

@Injectable()
export class UserEventsService {
  @RabbitRPC({
    exchange: 'user.events',
    routingKey: 'user.created',
    queue: 'user_created_queue',
  })
  public async handleUserCreatedRPC(event: UserCreatedEvent) {
    console.log('Received RPC user.created event:', event);
    return { status: 'processed', event };
  }

  @RabbitSubscribe({
    exchange: 'user.events',
    routingKey: 'user.created',
    queue: 'user_created_subscribe_queue',
  })
  public async handleUserCreatedSubscribe(event: UserCreatedEvent) {
    console.log('Received SUBSCRIBE user.created event:', event);
    // Process the event (e.g., send welcome email, update analytics, etc.)
  }
}