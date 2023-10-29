import { Controller } from 'src/decorator/customController.decorator';
import { SubTaskService } from './sub-task.service';
import { Body, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateSubTaskDto } from './dto/create-sub-task.dto';
import { UpdateSubTaskDto } from './dto/update-sub-task.dto';

@Controller('sub-task')
export class SubTaskController {
  constructor(private readonly subTaskService: SubTaskService) {}

  @Get('/find-by-task/:taskId')
  findByTaskId(@Param('taskId') taskId: string) {
    return this.subTaskService.findByTaskId(taskId);
  }

  @Post('/create/:taskId')
  create(
    @Param('taskId') taskId: string,
    @Body() createSubTaskDto: CreateSubTaskDto,
  ) {
    return this.subTaskService.create(taskId, createSubTaskDto);
  }

  @Patch('/update/:subTaskId')
  update(
    @Param('subTaskId') subTaskId: string,
    @Body() updateSubTaskDto: UpdateSubTaskDto,
  ) {
    return this.subTaskService.update(subTaskId, updateSubTaskDto);
  }
}
