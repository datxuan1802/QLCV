import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { MailService } from 'src/mail/mail.service';

@Module({
  providers: [TaskService, MailService],
  controllers: [TaskController],
})
export class TaskModule {}
