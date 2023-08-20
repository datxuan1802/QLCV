// import { Injectable, Controller } from '@nestjs/common';
// import { InjectModel } from '@nestjs/mongoose';
// import { User } from './user.schema';
// import { Model } from 'mongoose';
// @Injectable()
// export class UserService {
//   constructor(@InjectModel(User.name) private userModel: Model<User>) {}
//   async findAll(): Promise<User[]> {
//     return this.userModel.find().exec();
//   }
// }
import { Injectable } from '@nestjs/common';
import { UserRole } from 'src/enums/role.enum';

// TODO: CREATE TYPE FOR USER
export type User = any;

@Injectable()
export class UsersService {
  private readonly users = [
    {
      id: '1',
      name: 'John',
      email: 'john@test.com',
      password: '13456',
      roles: [UserRole.ADMIN, UserRole.MANAGER],
    },
    {
      id: '2',
      name: 'Jane',
      email: 'jane@test.com',
      password: '13456',
      roles: [UserRole.VIEWER],
    },
  ];

  async findByEmail(email: string): Promise<User | undefined> {
    return this.users.find((user) => user.email === email);
  }
}
