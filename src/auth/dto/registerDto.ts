import { UserRole } from 'src/enums/role.enum';

export default class registerDto {
  name: string;
  email: string;
  password: string;
  roles: UserRole[];
}
