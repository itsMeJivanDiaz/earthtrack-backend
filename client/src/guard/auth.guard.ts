import {
  CanActivate,
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { Roles } from './auth.decorator';
import { AuthPayloadModel } from './auth.interface';
import { BadRequestException } from '@nestjs/common/exceptions';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload: AuthPayloadModel = await this.jwtService.verifyAsync(
        token,
        {
          secret: this.configService.get<string>('AUTH_SECRET'),
        },
      );

      const roles = this.reflector.get(Roles, context.getHandler());

      if (!roles.includes(payload.role)) {
        throw new UnauthorizedException();
      }

      const currentTimestamp = Math.floor(Date.now() / 1000);

      const isExpired = payload.exp < currentTimestamp;

      if (isExpired) {
        throw new BadRequestException();
      }

      request['user'] = payload;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
