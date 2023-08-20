import { AuthService } from './auth.service';
import { UseGuards, Req, Controller, Post, Get, Body } from '@nestjs/common';
import { SignInDto } from './dto/signInDto';
import {} from '@nestjs/common';
import { Public } from 'src/decorator/isPublic.decorator';

@Controller('/auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Public()
  @Post('/login')
  login(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  //   @UseGuards(AuthGuard)
  @Get('/profile')
  getProfile(@Req() req) {
    return req.user;
  }
}
