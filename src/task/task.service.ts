import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ETimeDoneTask, Task } from './task.schema';
import { EStatus } from './task.schema';

@Injectable()
export class TaskService {
  constructor(@InjectModel(Task.name) private taskRepository: Model<Task>) {}

  async create(boardId: string, createTaskDto: CreateTaskDto) {
    return await this.taskRepository.create({ ...createTaskDto, boardId });
  }

  async findAll() {
    return await this.taskRepository.find();
  }
  async findByBoardId(boardId: string) {
    return await this.taskRepository.find({ boardId });
  }

  assignTaskToUser() {
    return `This action returns all task`;
  }

  findOne(id: number) {
    return `This action returns a #${id} task`;
  }

  update(taskId: string, updateTaskDto: UpdateTaskDto) {
    return this.taskRepository.findByIdAndUpdate(taskId, updateTaskDto);
  }

  // check assignId and ownerId laster
  async updateStatus(taskId: string, status: EStatus) {
    const targetTask = await this.taskRepository.findById(taskId);
    if (status === EStatus.DONE && targetTask.status !== EStatus.DONE) {
      const now = new Date();
      const dueDate = targetTask.dueDate;
      switch (true) {
        case now > dueDate:
          return await this.taskRepository.findByIdAndUpdate(taskId, {
            status,
            timeDone: ETimeDoneTask.OVERDUE,
          });
        case now === dueDate:
          return await this.taskRepository.findByIdAndUpdate(taskId, {
            status,
            timeDone: ETimeDoneTask.ONTIME,
          });
        case now < dueDate:
          return await this.taskRepository.findByIdAndUpdate(taskId, {
            status,
            timeDone: ETimeDoneTask.SOON,
          });
        default:
          return this.taskRepository.findByIdAndUpdate(taskId, {
            status,
            timeDone: null,
          });
      }
    } else {
      return await this.taskRepository.findByIdAndUpdate(taskId, { status });
    }
    // const targetTask = this.taskRepository.findByIdAndUpdate(taskId, { status });
  }

  remove(id: number) {
    return `This action removes a #${id} task`;
  }
}
