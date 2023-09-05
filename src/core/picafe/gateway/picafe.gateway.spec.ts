import { Test, TestingModule } from '@nestjs/testing';
import { PicafeGateway } from './picafe.gateway';
import { PicafeService } from '../services/picafe.service';

describe('PicafeGateway', () => {
  let gateway: PicafeGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PicafeGateway, PicafeService],
    }).compile();

    gateway = module.get<PicafeGateway>(PicafeGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
