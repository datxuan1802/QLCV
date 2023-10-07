import { Roles } from './../decorator/roles.decorator';
import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { UserRole } from 'src/enums/role.enum';
import { User } from 'src/users/users.schema';
import { Workspace } from 'src/workspaces/workspaces.schema';

@Schema({ timestamps: true })
export class WorkspacePermission extends Document {
  //   @Prop({ type: Types.ObjectId })
  //   _id: Types.ObjectId;

  @Prop({
    type: Types.ObjectId,
    ref: 'User',
    required: [true, 'userId is required'],
  })
  user: User;

  @Prop({
    type: Types.ObjectId,
    ref: 'User',
    required: [true, 'ownerId is required'],
  }) // Use Types.ObjectId and set the ref to the User model
  owner: User;

  @Prop({
    type: Types.ObjectId,
    ref: 'Workspace',
    required: [true, 'workspaceId is required'],
  }) // Use Types.ObjectId and set the ref to the User model
  workspace: Workspace;

  @Prop()
  roles: UserRole[];

  @Prop({
    type: Boolean,
    default: true,
  })
  isAccessInvite: boolean;
}

export const WorkspacePermissionSchema =
  SchemaFactory.createForClass(WorkspacePermission);
