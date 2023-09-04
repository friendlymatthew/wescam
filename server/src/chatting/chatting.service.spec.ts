import { Test, TestingModule } from '@nestjs/testing';
import { ChattingService } from './chatting.service';

describe('ChattingService', () => {
  let service: ChattingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChattingService],
    }).compile();

    service = module.get<ChattingService>(ChattingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
