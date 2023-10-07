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

  @Prop({
    default:
      'https://trung-storage.s3.ap-southeast-1.amazonaws.com/avatar/user.png?response-content-disposition=inline&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaDmFwLXNvdXRoZWFzdC0xIkgwRgIhAPU1XXHzc1Jo1ls83O9qR%2FthcbXREMxUCNQOb4j6ZIsNAiEA3Mzru2yBTTxmRGuaAPSpVIO1ANqAQMZ8B4N0BrIJeQQq7QIIjP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgwxODQ0MDI0MDczNDEiDDEVhRiArJNs8yUvxirBAr1gdYUcKLT7udJkL0%2FIZdEgdDNSGOgI1T0QKBrUWqOENguLM01aaP7W7Uu7B%2BoVMBLgw0dQpYNJyASQfeghqZ1z9AJ1eUfVrYuovfw0mj%2Fnh0TuFxNJYoKDg0P1GkIazmKsfwnci19tgoClibQawCMlNoReG1npnqlonF4weAMMnLmSDhD5TnWOY2I8drmCvq1HkCSrZDvgnQT9dWTBqn5GTDByAKmdSlyECT3WHMjken53jJfQIGM2Y%2F%2F8pHxNnxJABqeVL1tO7Unr8IJ1WbM7N0brmSwWsyUEcScoPy%2BI2Moh8GdcxeSP42WstOEGyxAc2jBHTWcUoqsT4UNvV%2BWRCY3lu9A3pW8Lf71yZ6mjsoXULu95uNCl5q5DNijUsPwOe39WNkWN05nJRbsTNTY4j%2Fx7%2F4ZKH%2F7X6aJ0%2BQWdUzD09oSpBjqyAnYkX5Z7IiSAmklWblfaXzAQ7kvP2VObGSlc75NEntPYtjmQUL%2F0VajXW1D%2B51Qnv5UNP%2FS6a%2B4Pe1G9GUM%2FKQPJ%2FUOKrmsPGpB9FOQSm%2BQkJXqhCXPW%2Bj%2Fb%2F2B0YD%2BtuKTYDWVnlJrjKInxOmGh86134QUD1j8BGO4MTgxyB8%2BOR4EvLZmbX4HKJJONm3zShZ30mkgkOhOK0d3lLslJ%2FY36lVFNJdWyOJm8FTPa5H2sUcKojXCo4UbWKGsdBhosH3UMQSNVlx%2B%2FncSBVl3TQNPaKXyh9lvs1wJ7hk06UcvaA%2BuiVj27hVFg3t4bLAV7YIriD15Vkw%2Br6Qz38E06hut2eTrlcu0yR7TqJ2kCDbLAP9lJgW%2FLlI0gNg0mwAkSEwHtyMviW3Wh%2Bv3J3RPIfA9H%2Bg%3D%3D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20231007T110746Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Credential=ASIASV3Z5N6WYBLNONT5%2F20231007%2Fap-southeast-1%2Fs3%2Faws4_request&X-Amz-Signature=5ff3772dc76a36ccc9482e026c3fd81a31a90e769eb3c4a9a4e6cb54a8756258',
  })
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
