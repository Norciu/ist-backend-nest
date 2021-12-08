import { Body, Controller, Get, Post, Res, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { User } from 'src/auth/jwt.strategy';
import { LoginBodyDto } from './users.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {

  constructor(
    private readonly userService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Post('login')
  async login(@Body() body: LoginBodyDto, @Res() res) {
    const { username, password } = body;
    const user = await this.userService.findUser(username);
    if (!user || (user && user.disabled)) {
      throw new UnauthorizedException();
    }

    const isValidUser = this.userService.validatePassword(password, user.password);
    if (!isValidUser) {
      throw new UnauthorizedException();
    }

    delete user.password;
    const authorization: string = this.authService.signJwtToken({ user });

    return res.code(200).send({ authorization, username: user.username });
  }

  @UseGuards(JwtAuthGuard)
  @Get('test')
  test(@User() usr, @Res() res) {
    res.code(200).send(usr);
  }
}
