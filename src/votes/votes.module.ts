import { Module } from '@nestjs/common';
import { VotesService } from './votes.service';
import { VotesController } from './votes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnswerVote } from './entities/answer-vote.entity';
import { QuestionVote } from './entities/question-vote.entity';
import { UsersModule } from 'src/users/users.module';
import { QuestionsModule } from 'src/questions/questions.module';
import { AnswersModule } from 'src/answers/answers.module';
import { DisallowSelfGuard } from './guards/disallow-self.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([AnswerVote, QuestionVote]),
    UsersModule,
    QuestionsModule,
    AnswersModule,
  ],
  controllers: [VotesController],
  providers: [VotesService, DisallowSelfGuard],
})
export class VotesModule {}
