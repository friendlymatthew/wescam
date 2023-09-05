import { Module } from '@nestjs/common';
import { RogueUsersService } from './Rogue-users.service';
import { RogueUsersController } from './Rogue-users.controller';

@Module({
  controllers: [RogueUsersController],
  providers: [RogueUsersService],
})
export class RogueUsersModule {}
