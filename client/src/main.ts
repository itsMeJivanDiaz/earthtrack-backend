import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ExceptionCustomFilter } from './filters/exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.useGlobalFilters(new ExceptionCustomFilter());
  await app.listen(configService.get<number>('CLIENT_PORT') || 3460);
}
bootstrap();
