import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Workspace } from 'src/workspaces/workspaces.schema';
import mongoose from 'mongoose';

@Schema({ timestamps: true })
export class Board extends Document {
  _id: mongoose.Types.ObjectId;

  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop({
    type: Types.ObjectId,
    ref: 'Workspace',
    required: [true, 'workspace is required'],
  })
  workspace: Workspace;
}

export const BoardSchema = SchemaFactory.createForClass(Board);
