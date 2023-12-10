import { UserRole } from 'src/enums/role.enum';
export default class CreateDtoFromGoogle {
  name: string;
  email: string;
  password: string;
  roles: UserRole[];
  isActivated: boolean;
  avatar?: string;
}
