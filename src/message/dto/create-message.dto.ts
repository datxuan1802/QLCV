import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';
export class CreateMessageDto {
  @ApiProperty({ example: 'task name', description: 'task name' })
  task: Types.ObjectId;
  @ApiProperty({ example: 'task description', description: 'user comment' })
  user: Types.ObjectId;
  @ApiProperty({ example: 'task priority', description: 'message' })
  message: string;
}
