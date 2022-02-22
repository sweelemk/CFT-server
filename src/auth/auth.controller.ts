import { Body, Controller, Post } from '@nestjs/common';
import { UserDto } from '../user/dto/user.dto';
import { AuthService } from './auth.service';
import { AuthDto } from './auth.interface';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  login(@Body() userDto: UserDto) {
    return this.authService.login(userDto);
  }

  @Post('/register')
  register(@Body() userDto: UserDto) {
    return this.authService.register(userDto);
  }

  @Post('/refresh')
  refresh(@Body() authDto: AuthDto) {
    return this.authService.refresh(authDto);
  }
}
