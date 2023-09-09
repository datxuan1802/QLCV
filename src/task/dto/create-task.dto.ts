import { ApiProperty } from '@nestjs/swagger';
import { EStatus, EPriority, ETimeDoneTask } from '../task.schema';
export class CreateTaskDto {
  @ApiProperty({ example: 'task name', description: 'task name' })
  name: string;
  @ApiProperty({ example: 'task description', description: 'task description' })
  description: string;
  @ApiProperty({ example: 'task priority', description: EPriority.HIGH })
  priority: EPriority;
  @ApiProperty({ description: 'task due date' })
  dueDate: Date;
  @ApiProperty({
    example: 'task background url',
    description: 'task background url',
  })
  bg_url: String;
}
