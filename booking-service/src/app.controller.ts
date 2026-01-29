import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller()
export class AppController {
  @Get()
  @ApiOperation({ summary: 'Service health check' })
  @ApiResponse({ 
    status: 200, 
    description: 'Service is running',
    schema: {
      example: {
        service: 'booking-service',
        status: 'running',
        timestamp: '2024-01-29T10:00:00.000Z',
        endpoints: {
          apiDocs: '/api',
          bookings: '/bookings',
          services: '/bookings/services'
        }
      }
    }
  })
  getHello(): object {
    return {
      service: 'booking-service',
      status: 'running',
      timestamp: new Date().toISOString(),
      endpoints: {
        apiDocs: '/api',
        bookings: '/bookings',
        services: '/bookings/services'
      }
    };
  }

  @Get('health')
  @ApiOperation({ summary: 'Health check endpoint' })
  healthCheck(): object {
    return {
      status: 'healthy',
      service: 'booking-service',
      timestamp: new Date().toISOString(),
    };
  }
}