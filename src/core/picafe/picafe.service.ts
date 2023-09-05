import { Injectable } from '@nestjs/common';
import { CreatePicafeDto } from './dto/create-picafe.dto';
import { UpdatePicafeDto } from './dto/update-picafe.dto';

@Injectable()
export class PicafeService {
  create(createPicafeDto: CreatePicafeDto) {
    return 'This action adds a new picafe';
  }

  findAll() {
    return `This action returns all picafe`;
  }

  findOne(id: number) {
    return `This action returns a #${id} picafe`;
  }

  update(id: number, updatePicafeDto: UpdatePicafeDto) {
    return `This action updates a #${id} picafe`;
  }

  remove(id: number) {
    return `This action removes a #${id} picafe`;
  }
}
