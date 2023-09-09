import { ApiProperty } from '@nestjs/swagger';
import { EWorkspaceType } from '../workspaces.schema';
export class createWorkspaceDTO {
  @ApiProperty({ description: 'name', example: 'workspace 1' })
  name: string;
  @ApiProperty({ description: 'description', example: 'This is description' })
  description?: string;
  @ApiProperty({ description: 'type', example: 'private' })
  type: EWorkspaceType;
}
