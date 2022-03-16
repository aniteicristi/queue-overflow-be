import { IsAlpha, IsIn, IsInt, IsNotEmpty } from 'class-validator';

export class CreateAnswerVoteDto {
  @IsInt()
  @IsNotEmpty()
  answerId: number;

  @IsNotEmpty()
  @IsInt()
  @IsIn([-1, 1])
  amount: number;
}
