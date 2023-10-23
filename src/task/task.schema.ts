import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';
import { User } from 'src/users/users.schema';

export enum EPriority {
  HIGH = 'high',
  MEDIUM = 'medium',
  LOW = 'low',
}

export enum EStatus {
  TODO = 'todo',
  IN_PROGRESS = 'in-progress',
  DONE = 'done',
}
export enum ETimeDoneTask {
  SOON = 'soon',
  ONTIME = 'onTime',
  OVERDUE = 'overDue',
  CANCEL = 'cancel',
}

@Schema({ timestamps: true })
export class Task extends Document {
  _id: mongoose.Types.ObjectId;

  @Prop({
    type: Types.ObjectId,
    ref: 'Board',
    required: [true, 'Board is required'],
  })
  boardId: Types.ObjectId;

  //   @Prop({
  //     type: Types.ObjectId,
  //     ref: 'User',
  //     required: [true, 'OwnerId is required'],
  //   })
  //   ownerId: Types.ObjectId;

  @Prop({
    type: [
      {
        type: Types.ObjectId,
        ref: 'User',
        required: [true, 'AssignIds is required'],
      },
    ],
  })
  assignIds: User[];

  @Prop({ default: 'New Task' })
  name: string;

  @Prop()
  description: string;

  @Prop({ default: EStatus.TODO })
  status: EStatus;

  @Prop()
  priority: EPriority;

  @Prop({ required: [true, 'Due date is required'] })
  dueDate: Date;

  @Prop({ default: Date.now })
  startDate: Date;

  @Prop()
  bg_url: String;

  @Prop({ default: 0 })
  order: number;

  @Prop({ default: null })
  timeDone: ETimeDoneTask;

  @Prop()
  updatedAt: Date;
}

export const TaskSchema = SchemaFactory.createForClass(Task);

// TaskSchema.methods.setTimeDone = async function (status: EStatus) {
//   if (status === EStatus.DONE) {
//     if (this.updatedAt < new Date()) {
//       console.log('EStatus.DONE');
//       this.timeDone = ETimeDoneTask.SOON;
//     }
//     if (this.updatedAt === new Date()) {
//       console.log('EStatus.DONE');
//       this.timeDone = ETimeDoneTask.ONTIME;
//     }
//     if (this.updatedAt > new Date()) {
//       console.log('EStatus.DONE');
//       this.timeDone = ETimeDoneTask.OVERDUE;
//     }
//   }
//   console.log(this.timeDone);

//   this.updatedAt = new Date();
// };

// create method check task is Done in due date or not
