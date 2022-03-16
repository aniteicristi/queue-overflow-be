import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { AllowSelfOrModerator } from './guards/allow-self-or-moderator.guard';
import { IsModerator } from 'src/auth/is-moderator.guard';

@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Post()
  create(@Body() createQuestionDto: CreateQuestionDto, @Req() req: any) {
    console.log(req);
    return this.questionsService.create(createQuestionDto, req.user.id);
  }

  @Get('tag/:tag')
  findByTag(@Param('tag') tag: string) {
    return this.questionsService.findByTag(tag);
  }

  @Get('title/:title')
  findByTitle(@Param('title') title: string) {
    return this.questionsService.findByName(title);
  }

  @Get()
  findAll() {
    return this.questionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.questionsService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(AllowSelfOrModerator)
  update(
    @Param('id') id: string,
    @Body() updateQuestionDto: UpdateQuestionDto,
  ) {
    return this.questionsService.update(+id, updateQuestionDto);
  }

  @Delete(':id')
  @UseGuards(IsModerator)
  remove(@Param('id') id: string) {
    return this.questionsService.remove(+id);
  }
}
