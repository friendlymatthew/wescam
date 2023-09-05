import { Test, TestingModule } from '@nestjs/testing';
import { PicafeService } from '../picafe.service';

describe('PicafeService', () => {
  let service: PicafeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PicafeService],
    }).compile();

    service = module.get<PicafeService>(PicafeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
