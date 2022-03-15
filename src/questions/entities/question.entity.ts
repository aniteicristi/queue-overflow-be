import { Answer } from 'src/answers/entities/answer.entity';
import { Tag } from 'src/tags/entities/tag.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CreateQuestionDto } from '../dto/create-question.dto';

@Entity()
export class Question {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.questions)
  author: User;

  @Column()
  title: string;

  @Column()
  text: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @ManyToMany(() => Tag, { eager: true, cascade: true })
  @JoinTable()
  tags: Tag[];

  @OneToMany(() => Answer, (answer) => answer.question)
  answers: Answer[];

  @Column({ default: 0 })
  clout: number;

  static fromCreateDto(dto: CreateQuestionDto, tags: Tag[], author: User) {
    let question: Question = new Question();
    question.text = dto.text;
    question.title = dto.title;
    question.tags = tags;
    question.answers = [];
    question.author = author;
    return question;
  }
}
