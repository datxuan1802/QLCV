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
}
