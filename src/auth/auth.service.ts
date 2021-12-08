import { Injectable } from '@nestjs/common';
import { compareSync, hashSync } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  hashPassword(plainPassword: string) {
    return hashSync(plainPassword, 10);
  }

  comparePassword(plainPassword: string, hashedPassword: string): boolean {
    return compareSync(plainPassword, hashedPassword);
  }

  signJwtToken(payload) {
    return this.jwtService.sign(payload);
  }

  decodeJwt(token: string) {
    const parsedToken = token.replace(/Bearer /, '');
    return this.jwtService.decode(parsedToken);
  }
}
