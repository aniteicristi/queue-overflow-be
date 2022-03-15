import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class AuthUserDto {
  @IsNotEmpty()
  @IsEmail()
  @IsString()
  username: string;

  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
