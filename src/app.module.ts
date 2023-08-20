import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TaskModule } from './task/task.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import configuration from './config/configuration';
import { RolesGuard } from './auth/roles.guard';
import { AuthGuard } from './auth/auth.guard';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/task-management'),
    UsersModule,
    TaskModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'APP_GUARD',
      useClass: AuthGuard,
    },
    {
      provide: 'APP_GUARD',
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
