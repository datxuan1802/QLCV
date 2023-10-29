import { Injectable } from '@nestjs/common';
import { CreateSubTaskDto } from './dto/create-sub-task.dto';
import { UpdateSubTaskDto } from './dto/update-sub-task.dto';
import { SubTask } from './sub-task.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { getObjectId } from 'src/utils/helper';

@Injectable()
export class SubTaskService {
  constructor(
    @InjectModel(SubTask.name) private subTaskRepository: Model<SubTask>,
  ) {}
  async create(taskId: string, createSubTaskDto: CreateSubTaskDto) {
    return await this.subTaskRepository.create({
      ...createSubTaskDto,
      task: taskId,
    });
  }
  async update(subTaskId: string, updateSubTaskDto: UpdateSubTaskDto) {
    return await this.subTaskRepository.findByIdAndUpdate(
      subTaskId,
      updateSubTaskDto,
      { new: true },
    );
  }

  async findByTaskId(taskId: string) {
    return await this.subTaskRepository.find({ task: taskId });
  }
}
