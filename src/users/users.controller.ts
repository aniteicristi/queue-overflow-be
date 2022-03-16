import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpStatus,
  HttpException,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { Public } from 'src/auth/public.decorator';
import { IsModerator } from 'src/auth/is-moderator.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @Public()
  async create(@Body() createUserDto: CreateUserDto) {
    return UserResponseDto.fromEntity(
      await this.usersService.create(createUserDto),
    );
  }

  @Get()
  async findAll() {
    return (await this.usersService.findAll()).map(UserResponseDto.fromEntity);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return UserResponseDto.fromEntity(await this.usersService.findOne(+id));
  }

  @Patch(':id')
  @UseGuards(IsModerator)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(IsModerator)
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
