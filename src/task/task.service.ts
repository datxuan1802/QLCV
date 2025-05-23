import { Injectable, Logger } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ETimeDoneTask, Task } from './task.schema';
import { EStatus } from './task.schema';
import { getObjectId } from 'src/utils/helper';
import { UsersService } from 'src/users/users.service';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class TaskService {
  constructor(
    @InjectModel(Task.name) private taskRepository: Model<Task>,
    private usersService: UsersService,
    private mailService: MailService,
  ) {}

  async create(boardId: string, createTaskDto: CreateTaskDto) {
    const maxOrderTask = await this.taskRepository
      .findOne({
        boardId,
      })
      .sort({ order: -1 })
      .exec();

    const order: number = maxOrderTask ? maxOrderTask.order + 1 : 0;
    const newTask = await this.taskRepository.create({
      ...createTaskDto,
      boardId,
      order,
    });
    const user_new = await this.usersService.findById(
      String(newTask.assignIds[0]),
    );
    if (user_new) {
      await this.mailService.sendAssignUser(user_new.email, newTask);
    }
    const user = await newTask.populate('assignIds', '_id name email');
    return newTask;
  }

  async generate(generateTask: any) {
    return await this.taskRepository.create(generateTask);
  }

  async findAll() {
    return await this.taskRepository.find();
  }
  async findByBoardId(boardId: string, status: EStatus) {
    const queryOptions: any = {
      boardId,
    };

    if (status) {
      queryOptions.status = status;
    }
    return await this.taskRepository
      .find(queryOptions)
      .populate('assignIds', '_id name avatar')
      .sort({ order: 1 });
  }

  assignTaskToUser() {
    return `This action returns all task`;
  }

  async findOne(taskId: string) {
    return this.taskRepository
      .findById(getObjectId(taskId))
      .populate('assignIds', '_id name avatar')
      .exec();
  }

  update(taskId: string, updateTaskDto: UpdateTaskDto) {
    return this.taskRepository.findByIdAndUpdate(taskId, updateTaskDto);
  }

  // check assignId and ownerId laster
  async updateStatus(taskId: string, status: EStatus) {
    const targetTask = await this.taskRepository.findById(getObjectId(taskId));
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
      const targetTask = await this.taskRepository.findByIdAndUpdate(taskId, {
        status,
      });
      targetTask.save();
      return targetTask;
    }
  }

  remove(taskId: string) {
    return this.taskRepository.deleteOne({ _id: taskId });
  }
}
