import { Module } from '@nestjs/common';
import { InventoryController } from './inventory.controller';
import { InventoryService } from './inventory.service';
import { ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';

@Module({
  controllers: [InventoryController],
  providers: [
    InventoryService,
    {
      provide: 'INVENTORY_SERVICE',
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return ClientProxyFactory.create({
          transport: Transport.TCP,
          options: {
            host: configService.get<string>('INVENTORY_SERVICE_HOST'),
            port: configService.get<number>('INVENTORY_SERVICE_PORT'),
          },
        });
      },
    },
  ],
})
export class InventoryModule {}
