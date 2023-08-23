import { ApiProperty } from '@nestjs/swagger';

export class SignInDto {
  @ApiProperty({ example: 'trung@test.com', description: 'email' })
  email: string;
  @ApiProperty({ example: '123456', description: 'password' })
  password: string;
}
