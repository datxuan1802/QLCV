import { ApiProperty } from '@nestjs/swagger';
export class CreateBoardDto {
  @ApiProperty({ example: 'board name', description: 'name' })
  name: string;
  @ApiProperty({ example: 'board description', description: 'description' })
  description: string;
}
