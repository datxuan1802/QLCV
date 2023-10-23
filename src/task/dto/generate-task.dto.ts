import { ApiProperty } from '@nestjs/swagger';
import { EStatus, EPriority, ETimeDoneTask } from '../task.schema';
import { Types } from 'mongoose';
export class GenerateTaskDto {
  @ApiProperty({ type: [Types.ObjectId], description: 'Array of assignee IDs' })
  assignIds: Types.ObjectId[];
}
