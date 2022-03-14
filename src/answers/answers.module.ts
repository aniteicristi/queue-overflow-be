import { Module } from '@nestjs/common';
import { AnswersService } from './answers.service';
import { AnswersController } from './answers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Answer } from './entities/answer.entity';
import { QuestionsModule } from 'src/questions/questions.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Answer]), QuestionsModule, UsersModule],
  controllers: [AnswersController],
  providers: [AnswersService],
  exports: [AnswersService, TypeOrmModule.forFeature([Answer])],
})
export class AnswersModule {}
