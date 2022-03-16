import { IsIn, IsInt, IsNotEmpty } from 'class-validator';

export class CreateQuestionVoteDto {
  @IsInt()
  @IsNotEmpty()
  questionId: number;

  @IsNotEmpty()
  @IsInt()
  @IsIn([-1, 1])
  amount: number;
}
