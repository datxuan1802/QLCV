import { UsersService } from './../users/users.service';
import { Injectable } from '@nestjs/common';
import { UnauthorizedException } from '@nestjs/common/exceptions/unauthorized.exception';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/users.schema';
import RegisterDto from './dto/registerDto';
import { BadRequestException } from '@nestjs/common';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  async signIn(email: string, pass: string): Promise<{ access_token: string }> {
    const user = await this.usersService.findByEmail(email);
    if (!!!user) {
      throw new UnauthorizedException('Email not found');
    }
    const isValid = await user.comparePassword(pass);
    if (!isValid) {
      throw new UnauthorizedException('Wrong password');
    }
    const payload = { username: user.name, roles: user.roles };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
  async register(registerDto: RegisterDto): Promise<User> {
    try {
      return await this.usersService.create(registerDto);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
