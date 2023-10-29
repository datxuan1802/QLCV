import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';
import { Task } from 'src/task/task.schema';

export enum ESubStatus {
  TODO = 'todo',
  // IN_PROGRESS = 'in-progress',
  DONE = 'done',
}

@Schema({ timestamps: true })
export class SubTask extends Document {
  _id: mongoose.Types.ObjectId;

  @Prop({
    type: Types.ObjectId,
    ref: 'Task',
    required: [true, 'Task is required'],
  })
  task: Task;

  @Prop({ default: 'New Task' })
  name: string;

  @Prop({ default: ESubStatus.TODO })
  status: ESubStatus;
}

export const SubTaskSchema = SchemaFactory.createForClass(SubTask);
