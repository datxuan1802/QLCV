import RegisterDto from 'src/auth/dto/registerDto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './users.schema';
import { Model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { BadRequestException } from '@nestjs/common/exceptions';
@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async findByEmail(email: string): Promise<User | undefined> {
    return this.userModel.findOne({ email }).exec();
  }

  async activeToken(activeToken: string): Promise<any> {
    try {
      const user = await this.userModel.findOne({ activeToken }).exec();
      if (!user) {
        throw new BadRequestException('user not found by token');
      }
      user.isActivated = true;
      await user.save();
      return { success: true, message: 'Account activation successful' };
    } catch (error) {
      throw new BadRequestException('get error when active account');
    }
  }

  async create(registerDto: RegisterDto): Promise<User> {
    const activeToken = uuidv4();
    return this.userModel.create({ ...registerDto, activeToken });
  }
}
