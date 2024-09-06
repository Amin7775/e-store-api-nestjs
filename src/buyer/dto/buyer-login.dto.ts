import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class BuyerLoginDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
