import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  MicroserviceOptions,
  RpcException,
  Transport,
} from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
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
        host: configService.get<string>('INVENTORY_HOST') || 'inventory',
        port: configService.get<number>('INVENTORY_PORT') || 3630,
      },
    },
    { inheritAppConfig: true },
  );
  await app.listen();
}
bootstrap();
