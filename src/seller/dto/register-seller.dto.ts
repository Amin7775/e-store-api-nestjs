import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class RegisterSellerDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
