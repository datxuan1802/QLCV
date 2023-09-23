import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Types } from 'mongoose';
import * as bcryptjs from 'bcryptjs';
import { UserRole } from 'src/enums/role.enum';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  //   @Prop({required:true})
  _id: mongoose.Types.ObjectId;

  @Prop({ required: [true, 'Name is required'] })
  name: string;

  @Prop({
    required: [true, 'Email is required'],
    unique: [true, 'Email must be unique'],
  })
  email: string;

  @Prop({ required: [true, 'Password is required'] })
  password: string;

  @Prop()
  avatar: string;

  @Prop()
  bio: string;

  @Prop()
  roles: UserRole[];

  @Prop({ default: false })
  isActivated: boolean;

  @Prop()
  activeToken: string;

  async comparePassword(attempt: string): Promise<boolean> {
    return await bcryptjs.compare(attempt, this.password);
  }
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre<UserDocument>('save', async function name(next) {
  if (!this.isModified('password')) {
    return next();
  }
  try {
    const hashedPassword = await bcryptjs.hash(this.password, 10);
    this.password = hashedPassword;
  } catch (error) {
    return next(error);
  }
});

UserSchema.methods.comparePassword = async function (
  attempt: string,
): Promise<boolean> {
  return await bcryptjs.compare(attempt, this.password);
};
