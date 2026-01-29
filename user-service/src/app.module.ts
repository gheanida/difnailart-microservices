import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UsersModule, // UsersModule sudah include RabbitMQ
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}