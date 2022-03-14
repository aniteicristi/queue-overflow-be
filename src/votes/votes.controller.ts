import { Controller, Post, Body, Param, UseGuards } from '@nestjs/common';
import { CreateAnswerVoteDto } from './dto/create-answer-vote.dto';
import { CreateQuestionVoteDto } from './dto/create-question-vote.dto';
import { DisallowSelfGuard } from './guards/disallow-self.guard';
import { VotesService } from './votes.service';

@Controller('votes')
export class VotesController {
  constructor(private readonly votesService: VotesService) {}

  @Post('answer')
  @UseGuards(DisallowSelfGuard)
  voteAnswer(@Body() createVoteDto: CreateAnswerVoteDto) {
    return this.votesService.voteAnswer(createVoteDto);
  }

  @Post('question')
  @UseGuards(DisallowSelfGuard)
  voteQuestion(@Body() createVoteDto: CreateQuestionVoteDto) {
    return this.votesService.voteQuestion(createVoteDto);
  }
}
