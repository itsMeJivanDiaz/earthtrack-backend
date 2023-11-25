import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ExceptionCustomFilter } from './filters/custom-exception.filter';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new ExceptionCustomFilter());
  app.enableCors();
  const config = new DocumentBuilder()
    .setTitle('EarthTrack API')
    .setDescription('The EarthTrack API documentation')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  const configService = app.get(ConfigService);
  await app.listen(configService.get<number>('CLIENT_PORT') || 3460);
}
bootstrap();
