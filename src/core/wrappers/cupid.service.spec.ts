import { Test, TestingModule } from '@nestjs/testing';
import { CupidService } from '../picafe/services/cupid.service';

describe('CupidService', () => {
  let service: CupidService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CupidService],
    }).compile();

    service = module.get<CupidService>(CupidService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
