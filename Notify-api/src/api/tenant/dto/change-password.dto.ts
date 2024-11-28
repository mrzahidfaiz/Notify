import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class changePasswordDto {
  @IsNotEmpty()
  readonly password: string;
  @IsString()
  @MinLength(6)
  @IsNotEmpty()
  readonly newPassword: string;
}
