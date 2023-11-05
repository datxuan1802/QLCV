import { GenerateTaskDto } from './dto/generate-task.dto';
import { Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Controller } from 'src/decorator/customController.decorator';
import { EPriority, EStatus } from './task.schema';
import { ApiQuery } from '@nestjs/swagger';
import { randomAssignIds, randomDate, randomEnum } from 'src/utils/helper';
import { MailService } from 'src/mail/mail.service';
@Controller('task')
export class TaskController {
  constructor(
    private readonly taskService: TaskService,
    private readonly mailService: MailService,
  ) {}

  @Post('/create')
  async create(
    @Query('boardId') boardId: string,
    @Body() createTaskDto: CreateTaskDto,
  ) {
    const newTask = await this.taskService.create(boardId, createTaskDto);
    for (const user of newTask.assignIds) {
      this.mailService.sendAssignUser(user.email, newTask);
    }
    return newTask;
  }
  @Post('/generate-task')
  async generateTask(
    @Query('boardId') boardId: string,
    @Query('quantity') quantity: number,
    @Body() generateTask: GenerateTaskDto,
  ) {
    for (let i = 0; i < quantity; i++) {
      const task = {
        boardId,
        name: `Task ${i + 1}`,
        description: `Description Task ${i + 1}`,
        priority: randomEnum(EPriority),
        status: randomEnum(EStatus),
        startDate: new Date(),
        dueDate: randomDate(),
        assignIds: randomAssignIds(generateTask.assignIds),
      };
      await this.taskService.generate(task);
    }
    return {
      message: 'Generate task successfully',
    };
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
    return this.taskService.findOne(id);
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
