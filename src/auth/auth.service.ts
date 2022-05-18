import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserDto } from '../user/dto/user.dto';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '../user/user.interface';
import { AuthDto } from './auth.interface';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  async login(userDto: UserDto) {
    const user = await this.validateUser(userDto);
    return this.generateToken(user);
  }

  async register(userDto: UserDto) {
    const candidate = await this.userService.getUserByEmail(userDto.email);

    if (candidate) {
      throw new HttpException(
        'User with this email already exists',
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashedPassword = await bcrypt.hash(userDto.password, 12);
    const user = await this.userService.create({
      ...userDto,
      password: hashedPassword,
    });

    return this.generateToken(user);
  }

  async refresh(authDto: AuthDto) {
    const decode = await this.jwtService.decode(authDto.token);
    const payload = { full_name: decode['fullName'], email: decode['email'] };

    return {
      token: this.jwtService.sign(payload),
    };
  }

  private async generateToken(user: User) {
    const payload = { full_name: user.fullName, email: user.email };
    return {
      token: this.jwtService.sign(payload),
    };
  }

  private async validateUser(userDto: UserDto) {
    const candidate = await this.userService.getUserByEmail(userDto.email);
    const isCompared = await bcrypt.compare(
      userDto.password,
      candidate.password,
    );

    if (candidate && isCompared) {
      return candidate;
    }

    throw new UnauthorizedException({ message: 'Wrong credentials' });
  }
}
