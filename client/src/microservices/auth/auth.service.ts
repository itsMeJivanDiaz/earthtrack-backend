import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { AuthModel } from './interfaces/auth.interface';

@Injectable()
export class AuthService {
  constructor(@Inject('AUTH_SERVICE') private client: ClientProxy) {}

  signIn(data: AuthModel) {
    return this.client.send({ cmd: 'auth' }, data);
  }
}
