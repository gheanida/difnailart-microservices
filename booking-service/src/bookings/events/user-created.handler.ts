import { Injectable, Logger } from '@nestjs/common';
import { RabbitSubscribe, RabbitRPC } from '@golevelup/nestjs-rabbitmq';

@Injectable()
export class UserCreatedHandler {
  private readonly logger = new Logger(UserCreatedHandler.name);

  @RabbitRPC({
    exchange: 'user.events',
    routingKey: 'user.created.rpc',
    queue: 'booking_user_created_rpc_queue',
  })
  public async handleUserCreatedRPC(data: any) {
    this.logger.log('📨 Received RPC user.created event:', data);
    
    // Proses log order atau tindakan lainnya
    this.logger.log(`Processing order for new user: ${data.email}`);
    
    return {
      status: 'success',
      message: `User ${data.userId} processed by booking service`,
      timestamp: new Date().toISOString(),
    };
  }

  @RabbitSubscribe({
    exchange: 'user.events',
    routingKey: 'user.created',
    queue: 'booking_user_created_queue',
  })
  public async handleUserCreatedEvent(data: any) {
    this.logger.log('📨 Received user.created event:', data);
    
    // Log the event - SESUAI SOAL: "proses log order"
    this.logOrderLog(data);
    
    // Simpan ke database atau proses lainnya
    this.logger.log(`User ${data.data.userId} registered. Log order created.`);
  }

  private logOrderLog(eventData: any) {
    const logEntry = {
      eventType: 'USER_CREATED',
      userId: eventData.data?.userId,
      userEmail: eventData.data?.email,
      service: 'booking-service',
      action: 'LOG_ORDER',
      timestamp: new Date().toISOString(),
      metadata: eventData,
    };
    
    this.logger.log('📝 Order Log Entry:', logEntry);
    
    // Di sini Anda bisa menyimpan log ke database
    // this.orderLogRepository.save(logEntry);
  }
}