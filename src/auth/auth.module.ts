import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';
import { jwtConstants } from './constants';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from './auth.guard';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: {
        expiresIn: '600s',
      },
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
  // exports: [AuthController]
})
export class AuthModule {}
