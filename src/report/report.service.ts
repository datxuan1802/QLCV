import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task } from 'src/task/task.schema';

import { Cron, CronExpression } from '@nestjs/schedule';
import { User } from 'src/users/users.schema';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class ReportService {
  constructor(
    @InjectModel(Task.name) private taskRepository: Model<Task>,
    @InjectModel(User.name) private userRepository: Model<User>,
    private mailService: MailService,
  ) {}

  private readonly logger = new Logger(ReportService.name);

  async reportPersonal(id: string, queryConditions: any) {
    const { boardId, dueDate, startDate, priority, status } = queryConditions;

    const dateRangeCondition: any = {};

    if (startDate) {
      dateRangeCondition.dueDate = { $gte: startDate };
    }

    if (dueDate) {
      dateRangeCondition.dueDate = { $lte: dueDate };
    }
    const filteredConditions = {
      assignIds: id,
      ...(boardId && { boardId }),
      ...(priority && { priority }),
      ...(status && { status }),
    };
    return this.taskRepository
      .find({ assignIds: id, ...filteredConditions, ...dateRangeCondition })
      .exec();
  }

  @Cron(CronExpression.EVERY_WEEKEND, {
    name: 'handleCron',
  })
  async handleCron() {
    const users = await this.userRepository.find({}, 'email').exec();
    for (const user of users) {
      await this.mailService.sendReportEmail(user.email);
    }
  }
}
