import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class ValidationFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    const errorResponse = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
      message: 'Validation failed',
      errors: this.formatErrors(exceptionResponse),
    };

    response.status(status).json(errorResponse);
  }

  private formatErrors(response: any) {
    if (typeof response === 'string') {
      return { message: response };
    }
    
    if (Array.isArray(response.message)) {
      const errors = {};
      response.message.forEach(error => {
        const property = error.property;
        errors[property] = Object.values(error.constraints)[0];
      });
      return errors;
    }
    
    return response;
  }
}