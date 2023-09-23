import { Module } from '@nestjs/common';
import { WorkspacesService } from './workspaces.service';
import { WorkspacesController } from './workspaces.controller';
import { UsersService } from 'src/users/users.service';
import { MongooseModule } from '@nestjs/mongoose';
// schema
import { Workspace, WorkspaceSchema } from './workspaces.schema';
import { User, UserSchema } from 'src/users/users.schema';
import {
  WorkspacePermission,
  WorkspacePermissionSchema,
} from 'src/workspace-permission/workspace-permission.schema';
import { WorkspacePermissionService } from 'src/workspace-permission/workspace-permission.service';
import { BoardService } from 'src/board/board.service';
import { Board, BoardSchema } from 'src/board/board.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Workspace.name,
        schema: WorkspaceSchema,
      },
      {
        name: User.name,
        schema: UserSchema,
      },
      {
        name: WorkspacePermission.name,
        schema: WorkspacePermissionSchema,
      },
      {
        name: Board.name,
        schema: BoardSchema,
      },
    ]),
  ],
  providers: [
    WorkspacesService,
    UsersService,
    WorkspacePermissionService,
    BoardService,
  ],
  controllers: [WorkspacesController],
})
export class WorkspacesModule {}
