import { Module } from '@nestjs/common';
import { ChattingService } from './chatting.service';
import { ChattingGateway } from './chatting.gateway';

@Module({
  providers: [ChattingGateway, ChattingService],
})
export class ChattingModule {}
