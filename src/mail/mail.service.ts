import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { BadRequestException } from '@nestjs/common/exceptions';
import { Task } from 'src/task/task.schema';
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
  async sendAssignUser(email: string, task: Task): Promise<void> {
    const templateLetter = `
  <div style="font-family: Arial, sans-serif; background-color: #f5f5f5; padding: 20px; border-radius: 8px;">
    <h1 style="color: #333; text-align: center; text-decoration: underline;">Tên nhiệm: ${task.name}</h1>
    <div style="background-color: #fff; padding: 15px; border-radius: 8px; box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);">
      <p style="font-size: 16px; color: #555;">Mô tả nhiệm vụ: ${task.description}</p>
      <p style="font-size: 16px; color: #555;">Độ ưu tiên: ${task.priority}</p>
      <p style="font-size: 16px; color: #555;">Trạng thái: ${task.status}</p>
    </div>
  </div>
`;

    try {
      await this.mailerService.sendMail({
        to: email,
        subject: 'Bạn được assign vào một task mới',
        text: 'Bạn được assign vào một task mới',
        html: templateLetter,
      });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
