import { WorkspacePermissionService } from './../workspace-permission/workspace-permission.service';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EStatus, Task } from 'src/task/task.schema';

import { Cron, CronExpression } from '@nestjs/schedule';
import { User } from 'src/users/users.schema';
import { MailService } from 'src/mail/mail.service';
import { getObjectId, reduceTasksByStartDate } from 'src/utils/helper';
import { UserRole } from 'src/enums/role.enum';

@Injectable()
export class ReportService {
  constructor(
    @InjectModel(Task.name) private taskRepository: Model<Task>,
    @InjectModel(User.name) private userRepository: Model<User>,
    private mailService: MailService,
    private workspacePermissionService: WorkspacePermissionService,
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

  async getTaskDoneWithPriority(
    assignId: string,
    boardId: string,
    filterBy: string,
    queryConditions: any,
  ) {
    const { dueDate, startDate } = queryConditions;

    const dateRangeCondition: any = {};
    if (startDate) {
      dateRangeCondition.dueDate = { $gte: startDate };
    }
    if (dueDate) {
      dateRangeCondition.dueDate = { $lte: dueDate };
    }

    const filteredConditions = {
      assignIds: assignId,
      boardId,
    };

    const tasks = await this.taskRepository
      .find({ ...filteredConditions, ...dateRangeCondition })
      .exec();

    const taskCounts = tasks.reduce((acc, task) => {
      const filter = task[filterBy];
      acc[filter] = (acc[filter] || 0) + 1;
      return acc;
    }, {});

    let filterOptions = [];
    if (filterBy === 'priority') {
      filterOptions = ['low', 'medium', 'high']; // Define the priority order
    }
    if (filterBy === 'status') {
      filterOptions = ['todo', 'in-progress', 'done']; // Define the priority order
    }

    const countsByFilter = filterOptions.map(
      (priority) => taskCounts[priority] || 0,
    );

    return countsByFilter;
  }
  async getTaskInWeek(assignId: string, boardId: string, startDate: any) {
    const counts = {};

    const dateRangeCondition: any = {};

    if (startDate) {
      dateRangeCondition.doneAt = {
        $gte: new Date(startDate),
        $lte: new Date(new Date(startDate).getTime() + 6 * 24 * 60 * 60 * 1000), // Adding 6 days in milliseconds
      };
    }

    const tasks = await this.taskRepository
      .find({
        assignIds: assignId,
        boardId,
        status: EStatus.DONE,
        ...dateRangeCondition,
      })
      .exec();

    return reduceTasksByStartDate(tasks, startDate);
  }

  async checkPermission(userId: string, workspaceId: string) {
    const permission =
      await this.workspacePermissionService.findByUserAndWorkspaceId(
        userId,
        workspaceId,
      );
    if (
      permission.roles.includes(UserRole.ADMIN) ||
      permission.roles.includes(UserRole.MANAGER)
    ) {
      return true;
    }
    return false;
  }
  async getDoneTaskByMember(userId: string, boardId: string) {
    const tasks = await this.taskRepository
      .aggregate([
        {
          $match: {
            boardId,
            status: 'done', // Filter tasks that are done
            doneAt: { $ne: null }, // Ensure doneAt is not null
          },
        },
        {
          $group: {
            _id: '$assignIds', // Group tasks by assignIds
            count: { $sum: 1 }, // Count the tasks for each assignId
          },
        },
      ])
      .exec();

    // const result = await Promise.all(
    //   tasks.map((task) => {
    //     return {
    //       _id: task._id.map(async (assignId) => {
    //         return await this.userRepository
    //           .find({ _id: getObjectId(assignId) })
    //           .select('name avatar email')
    //           .exec();
    //       }),
    //       count: task.count,
    //     };
    //   }),
    // );
    // return result;
    const result = await Promise.all(
      tasks.map(async (task) => {
        const userPromises = task._id.map(async (assignId) => {
          return await this.userRepository
            .find({ _id: getObjectId(assignId) })
            .select('name avatar email')
            .exec();
        });

        const userDetails = await Promise.all(userPromises);

        return {
          user: userDetails, // Assuming userDetails already contains the user details for each ID
          count: task.count,
        };
      }),
    );
    return result;
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
