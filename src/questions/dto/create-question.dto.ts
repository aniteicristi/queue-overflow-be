import { ArrayMaxSize, IsArray, IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateQuestionDto {
  @IsNotEmpty()
  author: number;

  @IsNotEmpty()
  @MaxLength(100)
  title: string;

  @IsNotEmpty()
  @MaxLength(600000)
  text: string;

  @IsArray()
  @IsString({each: true})
  @ArrayMaxSize(10)
  tags: string[];
}
