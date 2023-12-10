import { UsersService } from './../users/users.service';
import { Injectable } from '@nestjs/common';
import { UnauthorizedException } from '@nestjs/common/exceptions/unauthorized.exception';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/users.schema';
import RegisterDto from './dto/registerDto';
import { BadRequestException } from '@nestjs/common';
import { MailService } from 'src/mail/mail.service';
import { uuid } from 'uuidv4';
import { UserRole } from 'src/enums/role.enum';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private mailService: MailService,
  ) {}
  async signIn(
    email: string,
    pass: string,
  ): Promise<{ access_token: string; user: any }> {
    const user = await this.usersService.findByEmail(email);
    if (!!!user) {
      throw new UnauthorizedException('Email not found');
    }
    if (!user.isActivated) {
      throw new UnauthorizedException('Account not activated');
    }
    const isValid = await user.comparePassword(pass);
    if (!isValid) {
      throw new UnauthorizedException('Wrong password');
    }
    const payload = {
      name: user.name,
      roles: user.roles,
      email,
      _id: user._id,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
      user: {
        name: user.name,
        email: user.email,
        _id: user._id,
        roles: user.roles,
      },
    };
  }
  // TODO: OPTIMIZE LATER
  async signInWithGoogle(accessToken: string): Promise<any> {
    try {
      const response = await fetch(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${accessToken}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            Accept: 'application/json',
          },
        },
      );

      if (response.ok) {
        const userInfo = await response.json();
        const existUser = await this.usersService.findByEmail(userInfo.email);
        if (existUser) {
          // return access_token
          const payload = {
            name: existUser.name,
            roles: existUser.roles,
            email: userInfo.email,
            _id: existUser._id,
          };
          return {
            access_token: await this.jwtService.signAsync(payload),
            user: {
              name: existUser.name,
              email: existUser.email,
              _id: existUser._id,
              roles: existUser.roles,
            },
          };
        } else {
          // create new user
          const newUser = await this.usersService.createUserFromGoogle({
            name: userInfo?.name,
            email: userInfo?.email,
            password: uuid(),
            roles: [UserRole.MEMBER],
            isActivated: true,
            avatar: userInfo.picture,
          });
          return {
            access_token: await this.jwtService.signAsync({
              name: newUser.name,
              roles: newUser.roles,
              email: newUser.email,
              _id: newUser._id,
            }),
            user: {
              name: newUser.name,
              email: newUser.email,
              _id: newUser._id,
              roles: newUser.roles,
            },
          };
        }
      } else {
        console.error('Error fetching user info:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching user info:', error);
    }
  }
  async register(registerDto: RegisterDto): Promise<User> {
    try {
      const newUser = await this.usersService.create(registerDto);
      await this.mailService.sendActivationEmail(
        newUser.email,
        newUser.activeToken,
      );
      return newUser;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
  async activeAccountByToken(token: string): Promise<any> {
    try {
      return await this.usersService.activeToken(token);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
  async findUserByEmail(email: string): Promise<User> {
    try {
      return this.usersService.findByEmail(email);
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Không tìm thấy user');
    }
  }

  async findUserById(id: string): Promise<User> {
    try {
      return this.usersService.findById(id);
    } catch (error) {
      throw new BadRequestException('Kh.TabControlService.findUserById');
    }
  }

  async update(id: string, updateUserDto: any): Promise<any> {
    try {
      return this.usersService.update(id, updateUserDto);
    } catch (error) {
      throw new BadRequestException('Kh.TabControlService.update');
    }
  }
}
