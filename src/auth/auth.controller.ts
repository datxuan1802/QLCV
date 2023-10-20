import { AuthService } from './auth.service';
import {
  Req,
  Post,
  Get,
  Body,
  Query,
  Render,
  Res,
  Patch,
} from '@nestjs/common';
import { SignInDto } from './dto/signInDto';
import {} from '@nestjs/common';
import { Public } from 'src/decorator/isPublic.decorator';
import RegisterDto from './dto/registerDto';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { Controller } from 'src/decorator/customController.decorator';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';

@Controller('/auth', false)
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
  @Public()
  @Get('active')
  activeAccountByToken(@Query('token') token: string, @Res() res) {
    this.authService.activeAccountByToken(token);
    res.redirect('http://localhost:5173/login');
  }

  @ApiBearerAuth('access-token')
  //   @UseGuards(AuthGuard)
  @Get('/profile')
  getProfile(@Req() req) {
    // return req.user;
    return this.authService.findUserById(req.user._id);
  }

  @ApiBearerAuth('access-token')
  @Get('/find-by-email')
  async findByEmail(@Query('email') email: string) {
    return await this.authService.findUserByEmail(email);
  }
  @ApiBearerAuth('access-token')
  @Patch('/update')
  async update(@Req() req, @Body() updateUserDto: UpdateUserDto) {
    return await this.authService.update(req.user._id, updateUserDto);
  }
}
