import { Controller, Body, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ErrorResponse } from 'src/shared/error-response';
import { AuthDTO, AuthResponseDTO } from './auth.dto';

@Controller('api/auth')
@ApiTags('Authentication')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBody({ type: AuthDTO })
  @ApiResponse({ status: 200, description: 'success', type: AuthResponseDTO })
  @ApiResponse({
    status: 401,
    description: 'unauthorized',
    type: ErrorResponse,
  })
  @ApiResponse({
    status: 500,
    description: 'internal server error',
    type: ErrorResponse,
  })
  @Post()
  signIn(@Body() data: AuthDTO) {
    return this.authService.signIn(data);
  }
}
