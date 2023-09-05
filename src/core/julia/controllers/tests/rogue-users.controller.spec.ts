import { Test, TestingModule } from '@nestjs/testing';
import { RogueUsersController } from '../rogue-users.controller';
import { RogueUsersService } from '../../services/rogue-users.service';

describe('RogueUsersController', () => {
  let controller: RogueUsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RogueUsersController],
      providers: [RogueUsersService],
    }).compile();

    controller = module.get<RogueUsersController>(RogueUsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
