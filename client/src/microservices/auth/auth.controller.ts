import { Controller, Body, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthModel } from './interfaces/auth.interface';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  signIn(@Body() data: AuthModel) {
    return this.authService.signIn(data);
  }
}
