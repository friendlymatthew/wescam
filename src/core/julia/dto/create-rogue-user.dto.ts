import { IsEmail } from 'class-validator';

export class CreateRogueUserDto {
  @IsEmail()
  email: string;
}
