import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({
    example: 'name',
    description: 'name',
  })
  name: string;
  @ApiProperty({
    example: 'avatar',
    description: 'avatar',
  })
  avatar: string;
  @ApiProperty({
    example:
      'https://trung-storage.s3.ap-southeast-1.amazonaws.com/avatar/user.png',
  })
  background: string;
  @ApiProperty({
    example: 'This is my bio',
  })
  bio: string;
}
