import { PartialType } from '@nestjs/swagger';
import { EWorkspaceType } from '../workspaces.schema';
import { createWorkspaceDTO } from './createWorkspaceDTO';
export class updateWorkspaceDTO extends PartialType(createWorkspaceDTO) {
  name: string;
  description?: string;
  type?: EWorkspaceType;
}
