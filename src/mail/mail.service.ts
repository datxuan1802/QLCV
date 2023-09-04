import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}
  async sendMail(to: string, subject: string, text: string, html: string) {
    const mailOptions = {
      to,
      subject,
      text,
      html,
    };

    return await this.mailerService.sendMail(mailOptions);
  }
}
