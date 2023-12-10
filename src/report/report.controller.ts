import { Controller } from 'src/decorator/customController.decorator';
import { ReportService } from './report.service';
import { Get, Query, Req } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';

@Controller('report')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Get('/personal')
  @ApiQuery({
    name: 'boardId',
    required: false,
  })
  @ApiQuery({
    name: 'dueDate',
    required: false,
  })
  @ApiQuery({
    name: 'startDate',
    required: false,
  })
  @ApiQuery({
    name: 'priority',
    required: false,
  })
  @ApiQuery({
    name: 'status',
    required: false,
  })
  getPersonalReport(
    @Req() req,
    @Query('boardId') boardId?: string,
    @Query('dueDate') dueDate?: Date,
    @Query('startDate') startDate?: Date,
    @Query('priority') priority?: string,
    @Query('status') status?: string,
  ) {
    const searchOptions = {
      boardId,
      dueDate,
      startDate,
      priority,
      status,
    };

    return this.reportService.reportPersonal(req.user._id, searchOptions);
  }

  @Get('/member/count-task-by-priority-or-status')
  @ApiQuery({
    name: 'boardId',
  })
  @ApiQuery({
    name: 'dueDate',
    required: false,
  })
  @ApiQuery({
    name: 'startDate',
    required: false,
  })
  @ApiQuery({
    name: 'filterBy',
    required: false,
    enum: ['priority', 'status'],
  })
  countTaskByPriorityOrStatus(
    @Req() req,
    @Query('boardId') boardId?: string,
    @Query('filterBy') filterBy?: string,
    @Query('dueDate') dueDate?: Date,
    @Query('startDate') startDate?: Date,
  ) {
    const searchOptions = {
      dueDate,
      startDate,
    };
    return this.reportService.getTaskDoneWithPriority(
      req.user._id,
      boardId,
      filterBy,
      searchOptions,
    );
  }

  @Get('/member/count-task-by-week')
  @ApiQuery({
    name: 'boardId',
  })
  @ApiQuery({
    name: 'startDate',
  })
  countTaskByWeek(
    @Req() req,
    @Query('boardId') boardId?: string,
    @Query('startDate') startDate?: string,
  ) {
    return this.reportService.getTaskInWeek(req.user._id, boardId, startDate);
  }

  @Get('/manager/count-task-by-week')
  @ApiQuery({
    name: 'boardId',
  })
  @ApiQuery({
    name: 'workspaceId',
  })
  getDoneTaskByMember(
    @Req() req,
    @Query('boardId') boardId?: string,
    @Query('workspaceId') workspaceId?: string,
  ) {
    const isPermission = this.reportService.checkPermission(
      req.user._id,
      workspaceId,
    );
    if (!isPermission) {
      return {
        message: "You don't have permission",
        success: false,
      };
    }
    return this.reportService.getDoneTaskByMember(req.user._id, boardId);
  }
}
