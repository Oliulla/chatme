import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { SigninDto } from './dto/signin.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  async signup(dto: SignupDto) {
    return await this.authService.signup(dto);
  }

  async signin(dto: SigninDto) {
    return await this.authService.signin(dto);
  }
}
