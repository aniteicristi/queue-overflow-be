import { IsNotEmpty, IsString } from 'class-validator';

export class BanUserDTO {
  @IsNotEmpty()
  @IsString()
  reason: string;
}
