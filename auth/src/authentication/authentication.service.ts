import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { AuthDTO } from './authentication.dto';
import { JwtService } from '@nestjs/jwt';
import { AuthPayloadModel } from './authentication.interface';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(
    data: AuthDTO,
  ): Promise<any | RpcException | UnauthorizedException> {
    try {
      const { username, userpassword } = data;
      const user: any = await this.userService.getUserByUsername(username);
      const isMatch = await bcrypt.compare(userpassword, user?.userpassword);
      if (!isMatch) {
        return new UnauthorizedException();
      }
      const payload: AuthPayloadModel = {
        id: user.id,
        firstname: user.firstname,
        lastname: user.lastname,
        username: user.username,
        role: user.role,
      };
      const result = {
        access_token: await this.jwtService.signAsync(payload),
      };
      return result;
    } catch (e) {
      return new RpcException(e);
    }
  }
}
