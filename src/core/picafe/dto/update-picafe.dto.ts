import { PartialType } from '@nestjs/mapped-types';
import { CreatePicafeDto } from './create-picafe.dto';

export class UpdatePicafeDto extends PartialType(CreatePicafeDto) {
  id: number;
}
