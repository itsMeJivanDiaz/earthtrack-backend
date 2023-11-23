import { Catch, ArgumentsHost, ExceptionFilter } from '@nestjs/common';

@Catch()
export class FilterExceptions implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = exception.status || 500;
    response.status(status).json({
      statusCode: status,
      message: exception.message || exception,
    });
  }
}
