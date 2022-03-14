import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { Question } from './entities/question.entity';
import { Like, Repository } from 'typeorm';
import { Tag } from 'src/tags/entities/tag.entity';
import { TagsService } from 'src/tags/tags.service';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class QuestionsService {

  constructor(
    @InjectRepository(Question)
    private questionRepository: Repository<Question>,
    @Inject()
    private tagsService:TagsService,
    @Inject()
    private userService:UsersService
  ){}

  async create(createQuestionDto: CreateQuestionDto, author: number) : Promise<Question> {
    let tags:Tag[] = await this.tagsService.findList(createQuestionDto.tags); 
    let auth:User = await this.userService.findOne(+author);
    let question:Question = await Question.fromCreateDto(createQuestionDto, tags, auth);
    return await this.questionRepository.save(question);
  }

  async findAll() {
    return (await this.questionRepository.find())
      .sort((a,b) => a.createdAt.getTime() -  b.createdAt.getTime())
      .map(({answers, ...result}) => result);
  }

  async findByName(partialString: string) {
    return (await this.questionRepository.find({
      title: Like(`%${partialString}%`)
    }))
    .sort((a,b) => a.createdAt.getTime() -  b.createdAt.getTime())
    .map(({answers, ...result}) => result);
  }

  async findByTag(tag:string) {
    return (await this.tagsService
    .taggedQuestions(tag))
    .sort((a,b) => a.createdAt.getTime() -  b.createdAt.getTime())
    .map(({answers, ...result}) => result);
  }

  async findOne(id: number): Promise<Question> {
    let question:Question = await this.questionRepository.findOne(id, {relations: ['answers']});
    if(question == null){
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    return question;
  }

  async update(id: number, updateQuestionDto: UpdateQuestionDto) {
    let question:Question = await this.questionRepository.findOne(id);
    if(question == null){
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    let loadedTags:Tag[] = await this.tagsService.findList(updateQuestionDto.tags); 
    await this.questionRepository.update(question.id, {
      title: updateQuestionDto.title,
      text: updateQuestionDto.text,
      tags: loadedTags,
    });
  }

  async remove(id: number) {
    let question:Question = await this.questionRepository.findOne(id);
    if(question == null){
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }
    await this.questionRepository.remove(question);
  }

  //TODO make users be able to vote only once!
  vote(id:number, arg: number) {
    this.questionRepository.increment({id: id}, 'clout', arg);
  }

}
