import { UsersService } from './users.service';

export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  getUserByUsername(username: string) {
    return this.usersService.getUserByUsername(username);
  }
}
