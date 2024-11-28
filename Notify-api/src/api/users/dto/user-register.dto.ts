import {
  IsString,
  IsNotEmpty,
  IsEmail,
  MinLength,
  IsArray,
} from 'class-validator';

export class UserRegisterDto {
  @IsString()
  readonly name: string;

  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  readonly password: string;

  @IsArray()
  readonly roles: [];
}
