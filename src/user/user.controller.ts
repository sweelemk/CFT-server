import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Post()
  create(@Body() userDto: UserDto) {
    return this.userService.create(userDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  getAll() {
    return this.userService.getAll();
  }
}
