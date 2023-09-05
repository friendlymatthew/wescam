import { Test, TestingModule } from '@nestjs/testing';
import { RogueUsersService } from './rogue-users.service';

describe('RogueUsersService', () => {
  let service: RogueUsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RogueUsersService],
    }).compile();

    service = module.get<RogueUsersService>(RogueUsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
