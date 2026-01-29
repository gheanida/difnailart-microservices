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
        service: 'user-service',
        status: 'running',
        timestamp: '2024-01-29T10:00:00.000Z',
        endpoints: {
          apiDocs: '/api',
          users: '/users',
          register: '/users/register',
          login: '/users/login'
        }
      }
    }
  })
  getHello(): object {
    return {
      service: 'user-service',
      status: 'running',
      timestamp: new Date().toISOString(),
      endpoints: {
        apiDocs: '/api',
        users: '/users',
        register: '/users/register',
        login: '/users/login'
      }
    };
  }

  @Get('health')
  @ApiOperation({ summary: 'Health check endpoint' })
  healthCheck(): object {
    return {
      status: 'healthy',
      service: 'user-service',
      timestamp: new Date().toISOString(),
    };
  }
}