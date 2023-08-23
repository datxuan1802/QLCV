import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from 'src/enums/role.enum';

export default class registerDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  password: string;
  @ApiProperty({ enum: UserRole, isArray: true })
  roles: UserRole[];
}
