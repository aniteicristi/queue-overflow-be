import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Question } from 'src/questions/entities/question.entity';
import { Repository } from 'typeorm';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { Tag } from './entities/tag.entity';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tag)
    private tagsRepository: Repository<Tag>,
  ) {}

  async findAll() {
    return this.tagsRepository.find();
  }

  async findList(tags: string[]): Promise<Tag[]> {
    if (tags.length == 0) return [];

    return Promise.all(
      tags.map(async (tag) => {
        let dbTag: Tag = await this.tagsRepository.findOne(tag);
        return dbTag ?? (await this.tagsRepository.save(new Tag(tag)));
      }),
    );
  }

  async taggedQuestions(tag: string): Promise<Question[]> {
    let dbTag: Tag = await this.tagsRepository.findOne(tag, {
      relations: ['questions'],
    });
    return dbTag.questions;
  }
}
