import { Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Controller } from 'src/decorator/customController.decorator';
import { EStatus } from './task.schema';
import { ApiQuery } from '@nestjs/swagger';
@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post('/create')
  create(
    @Query('boardId') boardId: string,
    @Body() createTaskDto: CreateTaskDto,
  ) {
    return this.taskService.create(boardId, createTaskDto);
  }

  @Get()
  findAll() {
    return this.taskService.findAll();
  }
  @Get('/findByBoardId/:boardId')
  @ApiQuery({
    name: 'status',
    enum: EStatus,
    description: 'Filter tasks by status',
    required: false,
  })
  findByBoardId(
    @Param('boardId') boardId: string,
    @Query('status') status: EStatus,
  ) {
    return this.taskService.findByBoardId(boardId, status);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.taskService.findOne(+id);
  }

  @Patch('update/:taskId')
  update(
    @Param('taskId') taskId: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    return this.taskService.update(taskId, updateTaskDto);
  }
  @Patch('/update-status/:taskId')
  @ApiQuery({ name: 'status', required: true, enum: EStatus })
  updateStatus(
    @Param('taskId') taskId: string,
    @Query('status') status: EStatus,
  ) {
    return this.taskService.updateStatus(taskId, status);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.taskService.remove(+id);
  }
}
