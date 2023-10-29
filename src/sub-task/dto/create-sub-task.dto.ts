import { ApiProperty } from '@nestjs/swagger';
import { ESubStatus } from 'src/sub-task/sub-task.schema';
export class CreateSubTaskDto {
  @ApiProperty({ example: 'sub task name', description: 'sub task name' })
  name: string;

  @ApiProperty({ example: ESubStatus.TODO, description: 'sub task status' })
  status: ESubStatus;
}
