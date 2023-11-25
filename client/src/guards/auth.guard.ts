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
import { Roles } from './auth.guard.decorator';
import { AuthPayloadModel } from './auth.guard.interface';

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
    try {
      if (!token) {
        throw new UnauthorizedException();
      }

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
