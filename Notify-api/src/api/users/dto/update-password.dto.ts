import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class updatePasswordDto {
  @IsString()
  @MinLength(6)
  @IsNotEmpty()
  readonly newPassword: string;
}
