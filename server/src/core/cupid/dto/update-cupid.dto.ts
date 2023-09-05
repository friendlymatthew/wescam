import { PartialType } from '@nestjs/mapped-types';
import { CreateCupidDto } from './create-cupid.dto';

export class UpdateCupidDto extends PartialType(CreateCupidDto) {}
