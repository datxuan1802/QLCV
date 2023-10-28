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
}
