import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { BadRequestException } from '@nestjs/common/exceptions';
@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendActivationEmail(email: string, token: string): Promise<void> {
    const activeLink = `http://localhost:5556/api/v1/auth/active?token=${token}`;
    const logoSrc = '../images/leadership.png';
    try {
      await this.mailerService.sendMail({
        to: email,
        subject: 'Confirm password',
        template: './confirm',
        context: {
          activeLink,
          logoSrc,
        },
      });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async sendAccessInvite(
    email: string,
    workspacePermissionId: string,
  ): Promise<void> {
    const accessLink = `http://localhost:5556/api/v1/workspaces/access-invite?workspacePermissionId=${workspacePermissionId}`;
    try {
      await this.mailerService.sendMail({
        to: email,
        subject: 'Xác nhận lời mời',
        template: './access',
        context: {
          accessLink,
        },
      });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async sendReportEmail(email: string): Promise<void> {
    try {
      const reportHtml = `
      <h1>Weekly Task Report</h1>
      <p>Hello there,</p>
      <p>Here's your task report for the last week:</p>
      <h2>Task Summary</h2>
      <ul>
        <li>Tổng các task đã hoàn thành: 20</li>
        <li>Các task đang làm : 5</li>
        <li>Các task bị chậm thời hạn: 10</li>
      </ul>
      <h2>Hiệu suất tuần</h2>
      <ul>
        <li>Các nhiệm vụ đã hoàn thành đúng hạn: 85%</li>
        <li>Thời gian trung bình hoàn thành 1 nhiệm vụ: 4 days</li>
      </ul>
      <h2>Các task trong tuần tới</h2>
      <p>Bạn có một số nhiệm vụ cần hoàn thành trong tuần tới!</p>
      <p>Trân trọng,</p>
      <p>Your Task Management System</p>
    `;
      await this.mailerService.sendMail({
        to: email,
        subject: 'Báo cáo công việc tuần trước',
        text: 'Hey guy, I have some report for you',
        html: reportHtml,
        // template: './report',
      });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
