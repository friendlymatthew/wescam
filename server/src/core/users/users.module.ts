import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { RogueUsersModule } from '../rogue-users/rogue-users.module';
@Module({
  imports: [RogueUsersModule],
  controllers: [UsersController],
  providers: [UsersService, PrismaService],
})
export class UsersModule {}
