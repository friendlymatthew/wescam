import { Test, TestingModule } from '@nestjs/testing';
import { CupidController } from './cupid.controller';
import { CupidService } from './cupid.service';

describe('CupidController', () => {
  let controller: CupidController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CupidController],
      providers: [CupidService],
    }).compile();

    controller = module.get<CupidController>(CupidController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
