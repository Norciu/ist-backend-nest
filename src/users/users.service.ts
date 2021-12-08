import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/users/user.entity';
import { compareSync } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {}

  async findUser(username: string) {
    return this.usersRepository.findOne({ where: [
      { username },
      { email: username },
    ] });
  }

  validatePassword(plainPassword: string, hashedPassword: string) {
    return compareSync(plainPassword, hashedPassword);
  }
}
