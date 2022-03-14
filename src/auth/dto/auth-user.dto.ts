import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator";

export class AuthUserDto {
  @IsNotEmpty()
  @IsEmail()
  @IsString()
  email: string;

  @IsNotEmpty()
  @Length(8)
  password: string;
}