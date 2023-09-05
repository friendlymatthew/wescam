import { Module } from '@nestjs/common';
import { UsersModule } from './users.module';
import { RogueUsersModule } from './rogue-users.module';

@Module({
  imports: [UsersModule, RogueUsersModule],
  exports: [UsersModule, RogueUsersModule],
})
export class JuliaModule {}
