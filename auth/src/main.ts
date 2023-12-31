import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import {
  MicroserviceOptions,
  RpcException,
  Transport,
} from '@nestjs/microservices';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const appConfig = await NestFactory.create(AppModule);
  appConfig.enableCors();
  const configService = appConfig.get(ConfigService);
  appConfig.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      exceptionFactory: (errors) => {
        return new RpcException(errors);
      },
    }),
  );
  const app = appConfig.connectMicroservice<MicroserviceOptions>(
    {
      transport: Transport.TCP,
      options: {
        host: configService.get<string>('AUTH_HOST') || 'auth',
        port: configService.get<number>('AUTH_PORT') || 3740,
      },
    },
    { inheritAppConfig: true },
  );
  await app.listen();
}
bootstrap();
