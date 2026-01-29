import { Module } from '@nestjs/common';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq'; // Perbaiki typo package name
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    RabbitMQModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        exchanges: [
          {
            name: 'user.events',
            type: 'topic',
          },
          {
            name: 'booking.events',
            type: 'topic',
          },
        ],
        uri: configService.get('RABBITMQ_URL') || 'amqp://rabbitmq:5672',
        connectionInitOptions: { wait: false },
      }),
      inject: [ConfigService],
    }),
  ],
  exports: [RabbitMQModule],
})
export class RabbitmqModule {}