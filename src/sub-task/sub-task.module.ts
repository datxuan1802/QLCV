import { Module } from '@nestjs/common';
import { SubTaskController } from './sub-task.controller';
import { SubTaskService } from './sub-task.service';
import { TaskSchema } from 'src/task/task.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { SubTaskSchema } from './sub-task.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'SubTask',
        schema: SubTaskSchema,
      },
      {
        name: 'Task',
        schema: TaskSchema,
      },
    ]),
  ],
  controllers: [SubTaskController],
  providers: [SubTaskService],
})
export class SubTaskModule {}
