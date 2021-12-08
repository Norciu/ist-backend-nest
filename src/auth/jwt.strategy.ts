import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { createParamDecorator } from '@nestjs/common';

export interface JwtPayload {
  id: number;
  firstName: string;
  lastName: string;
  login: string;
  email: string;
  phoneNo: string;
  disabled: boolean;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: 'secret',
    });
  }

  async validate({ user }): Promise<JwtPayload> {
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}

export const User = createParamDecorator((data: unknown, context: ExecutionContext): JwtPayload => {
  const request = context.switchToHttp().getRequest();
  return request.user;
});
