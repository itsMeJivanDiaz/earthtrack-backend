import { UsersService } from './users.service';
import { Controller } from '@nestjs/common/decorators';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  async getUserByUsername(username: string) {
    return await this.usersService.getUserByUsername(username);
  }
}
