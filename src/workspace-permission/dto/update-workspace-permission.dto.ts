import { PartialType } from '@nestjs/swagger';
import { CreateWorkspacePermissionDto } from './create-workspace-permission.dto';

export class UpdateWorkspacePermissionDto extends PartialType(CreateWorkspacePermissionDto) {}
