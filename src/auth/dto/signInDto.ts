import { ApiProperty } from '@nestjs/swagger';

export class SignInDto {
  @ApiProperty({ example: 'vutrung26072001@gmail.com', description: 'email' })
  email: string;
  @ApiProperty({ example: '13456', description: 'password' })
  password: string;
}
