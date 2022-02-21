import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities';
import { Repository } from 'typeorm';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(dto: UserDto) {
    return this.userRepository.save(dto);
  }

  async getAll() {
    return this.userRepository.find();
  }
}
