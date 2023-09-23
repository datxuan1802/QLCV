import { Module } from '@nestjs/common';
import { WorkspacePermissionService } from './workspace-permission.service';
import { MongooseModule } from '@nestjs/mongoose';
// schema
import { WorkspacePermissionSchema } from './workspace-permission.schema';
import { UserSchema } from 'src/users/users.schema';
import { WorkspaceSchema } from 'src/workspaces/workspaces.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'WorkspacePermission',
        schema: WorkspacePermissionSchema,
      },
      // {
      //   name: 'Workspace',
      //   schema: WorkspaceSchema,
      // },
      // {
      //   name: 'User',
      //   schema: UserSchema,
      // },
    ]),
  ],
  providers: [WorkspacePermissionService],
})
export class WorkspacePermissionModule {}
