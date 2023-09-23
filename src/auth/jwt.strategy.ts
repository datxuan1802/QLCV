import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { User } from 'src/users/users.schema';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      //TODO: change later
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: User) {
    return {
      _id: payload._id,
      name: payload.name,
      email: payload.email,
      roles: payload.roles,
    };
  }
}
