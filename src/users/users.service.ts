import {
  HttpCode,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    let user: User = await this.userRepository.findOne({
      email: createUserDto.email,
    });
    if (user != null) {
      throw new HttpException(
        'email already registered',
        HttpStatus.BAD_REQUEST,
      );
    }
    user = await User.fromCreateDto(createUserDto);

    return await this.userRepository.save(user);
  }

  async findAll() {
    let users: User[] = await this.userRepository.find();
    return users;
  }

  async findOne(id: number) {
    let user: User = await this.userRepository.findOne(id);

    if (user == null) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    let user: User = await this.userRepository.findOne(id);

    if (user == null) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    await this.userRepository.update(user.id, {
      role: updateUserDto.role,
      email: updateUserDto.email,
      passwordHash:
        updateUserDto.password != undefined
          ? await bcrypt.hash(updateUserDto?.password, 10)
          : undefined,
    });
  }

  async remove(id: number) {
    let user: User = await this.userRepository.findOne(id);
    if (user == null) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    await this.userRepository.remove(user);
  }

  async score(id: number, arg: number) {
    this.userRepository.increment({ id: id }, 'score', arg);
  }
}
