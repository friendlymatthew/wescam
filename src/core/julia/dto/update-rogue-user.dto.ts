import { PartialType } from '@nestjs/mapped-types';
import { CreateRogueUserDto } from '../../dto/create-rogue-user.dto';
import { IsEmail } from 'class-validator';

export class UpdateRogueUserDto extends PartialType(CreateRogueUserDto) {
  @IsEmail()
  email: string;
}
