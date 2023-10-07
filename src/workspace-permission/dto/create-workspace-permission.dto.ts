import { ObjectId, Types } from 'mongoose';
import { UserRole } from 'src/enums/role.enum';
export class CreateWorkspacePermissionDto {
  user: any;
  owner: any;
  workspace: Types.ObjectId;
  roles: UserRole[];
  isAccessInvite?: Boolean;
}
