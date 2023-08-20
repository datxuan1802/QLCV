import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as bcrypt from 'bcrypt';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  //   @Prop({required:true})
  @Prop({ required: [true, 'Name is required'] })
  name: string;

  @Prop({
    required: [true, 'Email is required'],
    unique: [true, 'Email must be unique'],
  })
  email: string;

  @Prop({ required: [true, 'Password is required'] })
  password: string;

  // @Prop()
  // avatar: string
  @Prop()
  bio: string;

  // TODO: create enum
  @Prop()
  role: string;

  @Prop({ default: Date.now })
  created_at: Date;

  async comparePassword(attempt: string): Promise<boolean> {
    return await bcrypt.compare(attempt, this.password);
  }
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre<UserDocument>('save', async function name(next) {
  if (!this.isModified('password')) {
    return next();
  }
  try {
    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
  } catch (error) {
    return next(error);
  }
});
