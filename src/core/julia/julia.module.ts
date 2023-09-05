import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users.module';
import { RogueUsersModule } from './modules/rogue-users.module';

@Module({
  imports: [UsersModule, RogueUsersModule],
  exports: [UsersModule, RogueUsersModule],
})
export class JuliaModule {}
