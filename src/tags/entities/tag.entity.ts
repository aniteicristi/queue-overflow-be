import { Question } from 'src/questions/entities/question.entity';
import { Entity, JoinTable, ManyToMany, PrimaryColumn } from 'typeorm';

@Entity()
export class Tag {
  constructor(id) {
    this.identifier = id;
  }

  @PrimaryColumn()
  identifier: string;

  @ManyToMany(() => Question, (question) => question.tags)
  @JoinTable()
  questions: Question[];
}
