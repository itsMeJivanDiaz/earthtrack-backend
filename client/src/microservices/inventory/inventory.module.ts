import { Module } from '@nestjs/common';
import { InventoryController } from './inventory.controller';
import { InventoryService } from './inventory.service';
import { ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { JwtService } from '@nestjs/jwt/dist';

@Module({
  controllers: [InventoryController],
  providers: [
    InventoryService,
    JwtService,
    {
      provide: 'INVENTORY_MICROSERVICE',
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return ClientProxyFactory.create({
          transport: Transport.TCP,
          options: {
            host:
              configService.get<string>('INVENTORY_MICROSERVICE_HOST') ||
              'inventory',
            port:
              configService.get<number>('INVENTORY_MICROSERVICE_PORT') || 3630,
          },
        });
      },
    },
  ],
})
export class InventoryModule {}
