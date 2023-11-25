import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AuthDTO } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(@Inject('AUTH_MICROSERVICE') private client: ClientProxy) {}

  signIn(data: AuthDTO) {
    return this.client.send({ cmd: 'auth' }, data);
  }
}
