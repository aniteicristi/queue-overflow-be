import { Question } from 'src/questions/entities/question.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class QuestionVote {
  constructor(userFrom: User, userTo: User, question: Question, amount) {
    this.amount = amount;
    this.userFrom = userFrom;
    this.userTo = userTo;
    this.question = question;
  }

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  userFrom: User;

  @ManyToOne(() => User)
  userTo: User;

  @Column()
  amount: number;

  @ManyToOne(() => Question)
  question: Question;
}
