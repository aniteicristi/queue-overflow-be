import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Unique,
  OneToMany,
} from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { Question } from 'src/questions/entities/question.entity';
import { Answer } from 'src/answers/entities/answer.entity';

export enum UserRole {
  NORMAL = 'normal',
  MODERATOR = 'moderator',
}

@Entity()
@Unique(['email'])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  email: string;

  @Column()
  passwordHash: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.NORMAL,
  })
  role: UserRole;

  @Column({ default: 0 })
  score: number;

  @OneToMany(() => Question, (question) => question.author)
  questions: Question[];

  @OneToMany(() => Answer, (answer) => answer.author)
  answers: Answer[];

  static async fromCreateDto(dto: CreateUserDto) {
    let user: User = new User();
    user.email = dto.email;
    user.passwordHash = await bcrypt.hash(dto.password, 10);
    user.role = dto.role;
    return user;
  }
}
