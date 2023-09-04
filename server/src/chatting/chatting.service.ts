import { Injectable } from '@nestjs/common';
import { CreateChattingDto } from './dto/create-chatting.dto';
import { UpdateChattingDto } from './dto/update-chatting.dto';

@Injectable()
export class ChattingService {
  create(createChattingDto: CreateChattingDto) {
    return 'This action adds a new chatting';
  }

  findAll() {
    return `This action returns all chatting`;
  }

  findOne(id: number) {
    return `This action returns a #${id} chatting`;
  }

  update(id: number, updateChattingDto: UpdateChattingDto) {
    return `This action updates a #${id} chatting`;
  }

  remove(id: number) {
    return `This action removes a #${id} chatting`;
  }
}
