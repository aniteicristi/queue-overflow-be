import { IsNotEmpty } from "class-validator";

export class CreateAnswerDto {

  @IsNotEmpty()
  author:number;

  @IsNotEmpty()
  text:string;

  @IsNotEmpty()
  question:number
}
