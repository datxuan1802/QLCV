import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MailService } from './mail.service';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    MailerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        transport: {
          host: configService.get<string>('email.transport.host'),
          port: configService.get<number>('email.transport.port'),
          defaults: {
            from: configService.get<string>('email.transport.defaults.from'),
          },
          secure: configService.get<boolean>('email.transport.secure'),
          auth: {
            user: configService.get<string>('email.transport.auth.user'),
            pass: configService.get<string>('email.transport.auth.pass'),
          },
        },
      }),
    }),
  ],
  providers: [MailService, ConfigService],
  exports: [MailService],
})
export class MailModule {}
