import { Injectable, Logger } from '@nestjs/common';
import { 
  EventPattern, 
  MessagePattern, 
  Payload, 
  Ctx, 
  RmqContext 
} from '@nestjs/microservices';

@Injectable()
export class BookingEventsHandler {
  private readonly logger = new Logger(BookingEventsHandler.name);

  // EventPattern untuk menangani event asinkron
  @EventPattern('user.created')
  async handleUserCreatedEvent(@Payload() data: any, @Ctx() context: RmqContext) {
    this.logger.log('🎯 EventPattern: Received user.created event');
    this.logger.log('Event Data:', data);
    
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    
    // Acknowledge message
    channel.ack(originalMsg);
    
    // Proses log order
    this.logOrderForNewUser(data);
  }

  // MessagePattern untuk RPC (request-response)
  @MessagePattern('user.created.rpc')
  async handleUserCreatedRPC(@Payload() data: any, @Ctx() context: RmqContext) {
    this.logger.log('🎯 MessagePattern: Received user.created.rpc request');
    
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    
    // Acknowledge message
    channel.ack(originalMsg);
    
    // Proses dan return response
    return {
      status: 'processed',
      service: 'booking-service',
      userId: data.userId,
      timestamp: new Date().toISOString(),
      message: `Order log created for user ${data.email}`,
    };
  }

  private logOrderForNewUser(userData: any) {
    const logEntry = {
      type: 'NEW_USER_ORDER_LOG',
      userId: userData.data?.userId,
      userEmail: userData.data?.email,
      timestamp: new Date().toISOString(),
      action: 'CREATE_INITIAL_ORDER_LOG',
      status: 'PENDING',
    };
    
    this.logger.log('📋 Order Log Created:', logEntry);
    
    // Simpan ke "database" in-memory (untuk demo)
    this.saveOrderLog(logEntry);
    
    return logEntry;
  }

  private orderLogs = [];
  
  private saveOrderLog(logEntry: any) {
    this.orderLogs.push(logEntry);
    this.logger.log(`Total order logs: ${this.orderLogs.length}`);
  }

  @MessagePattern('get.order.logs')
  async getOrderLogs() {
    return {
      event: 'order.logs.retrieved',
      data: this.orderLogs,
      count: this.orderLogs.length,
      timestamp: new Date().toISOString(),
    };
  }
}