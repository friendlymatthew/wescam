import { Test, TestingModule } from '@nestjs/testing';
import { ChattingGateway } from './chatting.gateway';
import { ChattingService } from './chatting.service';

describe('ChattingGateway', () => {
  let gateway: ChattingGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChattingGateway, ChattingService],
    }).compile();

    gateway = module.get<ChattingGateway>(ChattingGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
