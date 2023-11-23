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
      provide: 'INVENTORY_SERVICE',
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return ClientProxyFactory.create({
          transport: Transport.TCP,
          options: {
            host:
              configService.get<string>('INVENTORY_SERVICE_HOST') ||
              'inventory',
            port: configService.get<number>('INVENTORY_SERVICE_PORT') || 3630,
          },
        });
      },
    },
  ],
})
export class InventoryModule {}
