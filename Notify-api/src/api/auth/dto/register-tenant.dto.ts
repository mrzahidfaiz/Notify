import { IsString, IsNotEmpty, IsEmail, MinLength } from 'class-validator';

export class RegisterTenantDto {
  @IsNotEmpty()
  readonly company_name: string;

  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  readonly password: string;
}
