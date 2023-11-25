import {
  Catch,
  ArgumentsHost,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ErrorResponse } from 'src/shared/error-response';

@Catch()
export class ExceptionCustomFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const message = exception.message || exception;
    const statusCode =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    const json: ErrorResponse = {
      statusCode: statusCode,
      message: message,
    };
    response.status(statusCode).json(json);
  }
}
