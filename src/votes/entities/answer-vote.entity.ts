import { Answer } from 'src/answers/entities/answer.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class AnswerVote {
  constructor(userFrom: User, userTo: User, answer: Answer, amount) {
    this.amount = amount;
    this.userFrom = userFrom;
    this.userTo = userTo;
    this.answer = answer;
  }

  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  userFrom: User;

  @ManyToOne(() => User)
  userTo: User;

  @Column()
  amount: number;

  @ManyToOne(() => Answer, { onDelete: 'CASCADE' })
  answer: Answer;
}
