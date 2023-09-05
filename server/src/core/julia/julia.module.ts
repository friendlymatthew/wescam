import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { RogueUsersModule } from './rogue-users/rogue-users.module';

@Module({
  imports: [UsersModule, RogueUsersModule],
  exports: [UsersModule, RogueUsersModule],
})
export class JuliaModule {}
