import { UsersService } from './users.service';

export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  async getUserByUsername(username: string) {
    return await this.usersService.getUserByUsername(username);
  }
}
