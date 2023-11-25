import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: 'AUTH_MICROSERVICE',
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return ClientProxyFactory.create({
          transport: Transport.TCP,
          options: {
            host: configService.get<string>('AUTH_MICROSERVICE_HOST') || 'auth',
            port: configService.get<number>('AUTH_MICROSERVICE_PORT') || 3740,
          },
        });
      },
    },
  ],
})
export class AuthModule {}
