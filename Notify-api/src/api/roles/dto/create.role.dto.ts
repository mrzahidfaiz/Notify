import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class CreateRoleDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsArray()
  readonly permissions: [];
}
