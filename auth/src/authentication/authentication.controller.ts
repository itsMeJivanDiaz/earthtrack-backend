import { Controller } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { MessagePattern } from '@nestjs/microservices';
import { AuthDTO } from './authentication.dto';

@Controller()
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @MessagePattern({ cmd: 'auth' })
  async signIn(data: AuthDTO) {
    return await this.authenticationService.signIn(data);
  }
}
