import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { SigninDto } from './dto/signin.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  async signup(@Body() dto: SignupDto) {
    return await this.authService.signup(dto);
  }

  @Post('/signin')
  async signin(@Body() dto: SigninDto) {
    return await this.authService.signin(dto);
  }

  @Get('/users')
  async findSpecificUser(@Query('id') id: string) {
    return await this.authService.findSpecificUser(id);
  }
}
