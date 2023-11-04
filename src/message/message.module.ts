import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Task, TaskSchema } from 'src/task/task.schema';
import { User, UserSchema } from 'src/users/users.schema';
import { Message, MessageSchema } from './message.schema';
import { MessageGateway } from './message.gateway';
import { MessageController } from './message.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Task.name,
        schema: TaskSchema,
      },
      {
        name: User.name,
        schema: UserSchema,
      },
      {
        name: Message.name,
        schema: MessageSchema,
      },
    ]),
  ],
  providers: [MessageService, MessageGateway],
  controllers: [MessageController],
})
export class MessageModule {}
