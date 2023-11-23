import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { InventoryModule } from './microservices/inventory/inventory.module';
import { AuthModule } from './microservices/auth/auth.module';
import { JwtModule } from '@nestjs/jwt/dist';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    InventoryModule,
    AuthModule,
    JwtModule,
  ],
})
export class AppModule {}
