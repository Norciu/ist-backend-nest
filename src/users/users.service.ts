import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/users/user.entity';
import { compareSync } from 'bcrypt';
import { CreateUserDto } from './users.dto';
import { setEntityProperty } from 'src/utils/entity_serializer';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    private readonly authService: AuthService,
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

  async createUser(userData: CreateUserDto) {
    const user = setEntityProperty(new User(), userData);
    user.password = this.authService.hashPassword(user.password);
    return this.usersRepository.save(user);
  }
}
