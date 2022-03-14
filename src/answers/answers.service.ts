import { HttpStatus, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Question } from 'src/questions/entities/question.entity';
import { QuestionsService } from 'src/questions/questions.service';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { Answer } from './entities/answer.entity';

@Injectable()
export class AnswersService {

  constructor(
    @InjectRepository(Answer)
    private answersRepository: Repository<Answer>,
    @Inject()
    private readonly questionService: QuestionsService,
    @Inject()
    private readonly userService: UsersService,
  ){}

  
  async create(createAnswerDto: CreateAnswerDto) {
    let author:User = await this.userService.findOne(createAnswerDto.author);
    let question:Question = await this.questionService.findOne(createAnswerDto.question)
    let answer:Answer = new Answer(createAnswerDto.text,author,question);
    return await this.answersRepository.save(answer);
  }

  async findOne(id: number) {
    return this.answersRepository.findOne(id);
  }

  async update(id: number, updateAnswerDto: UpdateAnswerDto) {
    let answer: Answer = await this.answersRepository.findOne(id);
    if(answer == null){
      throw new NotFoundException()
    }
    await this.answersRepository.update(id, {
      text: updateAnswerDto.text,
    });
  }

  async remove(id: number) {
    let answer:Answer = await this.answersRepository.findOne(id);
    if(answer == null){
      throw new NotFoundException();
    }
    await this.answersRepository.remove(answer);
  }

  //TODO make users be able to vote only once.
  async vote(id:number, arg: number) {
    this.answersRepository.increment({id:id}, 'clout', arg);
  }

}
