import { ApiProperty } from '@nestjs/swagger';

export class SignInDto {
  @ApiProperty({ example: 'xuandat18022k2@gmail.com', description: 'email' })
  email: string;
  @ApiProperty({ example: '123456', description: 'password' })
  password: string;
}
