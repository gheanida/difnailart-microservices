import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class ValidationFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    // Format sesuai permintaan soal
    const errorResponse = {
      statusCode: status,
      message: 'Validation failed',
      errors: typeof exceptionResponse === 'object' 
        ? exceptionResponse 
        : { message: exceptionResponse },
      timestamp: new Date().toISOString(),
    };

    response.status(status).json(errorResponse);
  }
}