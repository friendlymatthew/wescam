import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { UsersModule } from './core/users/users.module';
import { RogueUsersModule } from './core/rogue-users/rogue-users.module';

@Module({
  imports: [UsersModule, RogueUsersModule],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
