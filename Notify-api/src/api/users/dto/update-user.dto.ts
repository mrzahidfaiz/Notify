import { IsArray, IsEmail, IsNotEmpty } from 'class-validator';

export class UpdateUserDto {
  
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsArray()
  readonly roles: [];
  
}
