import { Module } from '@nestjs/common';
import { ReportController } from './report.controller';
import { ReportService } from './report.service';
// Mongo
import { MongooseModule } from '@nestjs/mongoose';
import { Board, BoardSchema } from 'src/board/board.schema';
import { Task, TaskSchema } from 'src/task/task.schema';
import { User, UserSchema } from 'src/users/users.schema';
import { MailService } from 'src/mail/mail.service';
import { WorkspacePermissionService } from 'src/workspace-permission/workspace-permission.service';
import {
  WorkspacePermission,
  WorkspacePermissionSchema,
} from 'src/workspace-permission/workspace-permission.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Task.name,
        schema: TaskSchema,
      },
      {
        name: Board.name,
        schema: BoardSchema,
      },
      {
        name: User.name,
        schema: UserSchema,
      },
      {
        name: WorkspacePermission.name,
        schema: WorkspacePermissionSchema,
      },
    ]),
  ],
  controllers: [ReportController],
  providers: [ReportService, MailService, WorkspacePermissionService],
})
export class ReportModule {}
