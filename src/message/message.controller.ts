import { Public } from 'src/decorator/isPublic.decorator';
import { MessageGateway } from './message.gateway';
import { MessageService } from './message.service';
import { Get, Param } from '@nestjs/common';
import { Controller } from 'src/decorator/customController.decorator';

@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}
  // TODO: Don't do that at home :D
  @Public()
  @Get('/:taskId')
  async findByTaskId(@Param('taskId') taskId: string) {
    return this.messageService.findByTaskId(taskId);
  }
}
