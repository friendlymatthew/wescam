import { Test, TestingModule } from '@nestjs/testing';
import { JuliaService } from '../../src/core/julia/service/julia.service';

describe('JuliaService', () => {
  let service: JuliaService;
/*
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JuliaService],
    }).compile();

    service = module.get<JuliaService>(JuliaService);
  });
*/
  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
