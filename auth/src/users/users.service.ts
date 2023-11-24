import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async getUserByUsername(username: string): Promise<User> {
    try {
      const response = await this.userRepository.findOneBy({ username });
      return response;
    } catch (e) {
      throw new RpcException({ message: e.message });
    }
  }
}
