import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Board extends Document {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop({
    type: Types.ObjectId,
    ref: 'Workspace',
    required: [true, 'workspace is required'],
  })
  workspaceId: Types.ObjectId;
}

export const BoardSchema = SchemaFactory.createForClass(Board);
