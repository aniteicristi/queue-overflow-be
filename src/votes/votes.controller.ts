import { Controller, Post, Body, Param, UseGuards, Req } from '@nestjs/common';
import { CreateAnswerVoteDto } from './dto/create-answer-vote.dto';
import { CreateQuestionVoteDto } from './dto/create-question-vote.dto';
import { DisallowSelfAnswerGuard } from './guards/disallow-self-answer.guard';
import { DisallowSelfQuestionGuard } from './guards/disallow-self-question.guard';
import { VotesService } from './votes.service';

@Controller('votes')
export class VotesController {
  constructor(private readonly votesService: VotesService) {}

  @Post('answer')
  @UseGuards(DisallowSelfAnswerGuard)
  voteAnswer(@Body() createVoteDto: CreateAnswerVoteDto, @Req() req: any) {
    return this.votesService.voteAnswer(createVoteDto, req.user.id);
  }

  @Post('question')
  @UseGuards(DisallowSelfQuestionGuard)
  voteQuestion(@Body() createVoteDto: CreateQuestionVoteDto, @Req() req: any) {
    return this.votesService.voteQuestion(createVoteDto, req.user.id);
  }
}
