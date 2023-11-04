import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';
import { Task } from 'src/task/task.schema';
import { User } from 'src/users/users.schema';

@Schema({ timestamps: true })
export class Message extends Document {
  _id: mongoose.Types.ObjectId;
  @Prop({
    type: Types.ObjectId,
    ref: 'Task',
    required: [true, 'Task is required'],
  })
  task: Task;

  @Prop({
    type: Types.ObjectId,
    ref: 'User',
    required: [true, 'User is required'],
  })
  user: User;

  @Prop({ default: 'New Message' })
  message: string;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
