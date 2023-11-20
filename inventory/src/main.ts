import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const appConfig = await NestFactory.create(AppModule);
  const configService = appConfig.get(ConfigService);
  const app = appConfig.connectMicroservice<MicroserviceOptions>({
    transport: Transport.TCP,
    options: {
      port: configService.get<number>('INVENTORY_PORT'),
    },
  });
  await app.listen();
}
bootstrap();
