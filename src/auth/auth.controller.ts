import { AuthService } from './auth.service';
import { Req, Post, Get, Body } from '@nestjs/common';
import { SignInDto } from './dto/signInDto';
import {} from '@nestjs/common';
import { Public } from 'src/decorator/isPublic.decorator';
import RegisterDto from './dto/registerDto';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { Controller } from 'src/decorator/customController.decorator';

@Controller('/auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Public()
  @ApiBody({ type: SignInDto })
  @Post('/login')
  login(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  @Public()
  @Post('register')
  @ApiBody({ type: RegisterDto })
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }
  //   @UseGuards(AuthGuard)
  @Get('/profile')
  getProfile(@Req() req) {
    return req.user;
  }
}
