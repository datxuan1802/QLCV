import { Get, Post, Body } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Public } from 'src/decorator/isPublic.decorator';
import { Roles } from 'src/decorator/roles.decorator';
import { UserRole } from 'src/enums/role.enum';
import { Controller } from 'src/decorator/customController.decorator';
import { MailService } from 'src/mail/mail.service';
import * as fs from 'fs';
@Controller('/task')
export class TaskController {
  constructor(private readonly mailService: MailService) {}
  @Public()
  @Get()
  getAllTask() {
    return 'get all task';
  }

  // @Public()
  // @Post('/send-mail')
  // async sendMail(@Body() body: any) {
  //   const { to, subject, text, html } = body;
  //   const template = fs.readFileSync('./src/templates/test-email.html', 'utf8');
  //   const personalizedHtml = template.replace('{{ name }}', html);
  //   try {
  //     await this.mailService.sendMail(to, subject, text, personalizedHtml);
  //   } catch (error) {
  //     console.log(error);
  //   }
  //   return { message: 'Email sent successfully' };
  // }
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth('access-token')
  @Get('/admin')
  getTaskAdmin() {
    return 'get task admin';
  }
}
