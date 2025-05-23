import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { Task, TaskSchema } from './task.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Board, BoardSchema } from 'src/board/board.schema';
import { User, UserSchema } from 'src/users/users.schema';
import { MailService } from 'src/mail/mail.service';
import { UsersService } from 'src/users/users.service';
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
    ]),
  ],
  controllers: [TaskController],
  providers: [TaskService, MailService, UsersService],
})
export class TaskModule {}
