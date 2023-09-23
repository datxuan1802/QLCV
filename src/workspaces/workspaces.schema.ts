import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import mongoose, { Document, SchemaTypes, Types } from 'mongoose';
import { Board } from 'src/board/board.schema';
import { User } from 'src/users/users.schema';

export enum EWorkspaceType {
  PUBLIC = 'public',
  PRIVATE = 'private',
}
@Schema({ timestamps: true })
export class Workspace extends Document {
  // @Prop({ type: Types.ObjectId })
  // _id: Types.ObjectId;
  _id: mongoose.Types.ObjectId;


  @Prop()
  name: string;

  @Prop()
  type: EWorkspaceType;

  @Prop()
  description: string;

  @Prop({
    type: Types.ObjectId,
    ref: 'User',
    required: [true, 'ownerId is required'],
  }) // Use Types.ObjectId and set the ref to the User model
  owner: User;

 // Use Types.ObjectId and set the ref to the User model
 @Prop({ type: [SchemaTypes.ObjectId], ref: 'Board', required: true })
  boards: Board[];
}

export const WorkspaceSchema = SchemaFactory.createForClass(Workspace);
