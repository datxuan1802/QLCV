import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export enum EWorkspaceType {
  PUBLIC = 'public',
  PRIVATE = 'private',
}
@Schema({ timestamps: true })
export class Workspace extends Document {
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
  ownerId: Types.ObjectId;
}

export const WorkspaceSchema = SchemaFactory.createForClass(Workspace);
