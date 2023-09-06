import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MailService } from './mail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';

// @Global()
@Module({
  imports: [
    MailerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        transport: {
          host: configService.get<string>('email.transport.host'),
          port: configService.get<number>('email.transport.port'),
          secure: configService.get<boolean>('email.transport.secure'),
          auth: {
            user: configService.get<string>('email.transport.auth.user'),
            pass: configService.get<string>('email.transport.auth.pass'),
          },
        },
        defaults: {
          from: configService.get<string>('email.transport.defaults.from'),
        },
        template: {
          dir: join(__dirname, 'templates'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
    }),
  ],
  providers: [MailService, ConfigService],
  exports: [MailService], //👈 export for DI
})
export class MailModule {}
