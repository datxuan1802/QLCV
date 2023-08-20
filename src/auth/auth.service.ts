import { UsersService } from './../users/users.service';
import { Injectable } from '@nestjs/common';
import { UnauthorizedException } from '@nestjs/common/exceptions/unauthorized.exception';
import { JwtService } from '@nestjs/jwt';
// TODO: CREATE TYPE FOR USER

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  // TODO: CHANGE ANY TYPE
  async signIn(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (!!!user) {
      throw new UnauthorizedException('Email not found');
    }
    if (user.password !== pass) {
      throw new UnauthorizedException('Wrong password');
    }
    const payload = { sub: user.id, username: user.name, roles: user.roles };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
