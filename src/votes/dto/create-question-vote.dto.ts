import { IsAlpha, IsIn, IsNotEmpty } from 'class-validator';

export class CreateQuestionVoteDto {
  @IsAlpha()
  @IsNotEmpty()
  questionId: number;

  @IsNotEmpty()
  @IsAlpha()
  @IsIn([-1, 1])
  amount: number;

  @IsAlpha()
  @IsNotEmpty()
  userFrom: number;

  @IsAlpha()
  @IsNotEmpty()
  userTo: number;
}
