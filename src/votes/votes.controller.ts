import {
  Controller,
  Post,
  Body,
  Param,
  UseGuards,
  Req,
  Query,
  Get,
  BadRequestException,
} from '@nestjs/common';
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
  @Get()
  getVote(
    @Query('question') question: number,
    @Query('answer') answer: number,
    @Req() req,
  ) {
    if (req.user.id == undefined) throw new BadRequestException();

    if (question != undefined) {
      return this.votesService.findVoteQuestion(question, req.user.id);
    }
    if (answer != undefined) {
      return this.votesService.findVoteAnswer(answer, req.user.id);
    }
    throw new BadRequestException();
  }
}
