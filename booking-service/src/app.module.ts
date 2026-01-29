import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { BookingsModule } from './bookings/bookings.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    BookingsModule, // BookingsModule sudah include RabbitMQ
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}