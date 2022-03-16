import { IsInt, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateAnswerDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(60000)
  text: string;

  @IsNotEmpty()
  @IsInt()
  question: number;
}
