import { forwardRef, Module } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { QuestionsController } from './questions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from './entities/question.entity';
import { TagsModule } from 'src/tags/tags.module';
import { UsersModule } from 'src/users/users.module';
import { AllowSelfOrModerator } from './guards/allow-self-or-moderator.guard';
import { Reflector } from '@nestjs/core';
import { VotesModule } from 'src/votes/votes.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Question]),
    TagsModule,
    UsersModule,
    Reflector,
  ],
  controllers: [QuestionsController],
  providers: [QuestionsService, AllowSelfOrModerator],
  exports: [TypeOrmModule.forFeature([Question]), QuestionsService],
})
export class QuestionsModule {}
