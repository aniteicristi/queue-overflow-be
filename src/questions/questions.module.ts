import { Module } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { QuestionsController } from './questions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from './entities/question.entity';
import { TagsModule } from 'src/tags/tags.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Question]), TagsModule, UsersModule],
  controllers: [QuestionsController],
  providers: [QuestionsService],
  exports: [TypeOrmModule.forFeature([Question]), QuestionsService],
})
export class QuestionsModule {}
