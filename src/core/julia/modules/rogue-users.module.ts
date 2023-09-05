import { Module } from '@nestjs/common';
import { RogueUsersService } from '../rogue-users/rogue-users.service';
import { RogueUsersController } from '../controllers/rogue-users.controller';
import { PrismaService } from 'src/database/prisma/prisma.service';

@Module({
  controllers: [RogueUsersController],
  providers: [RogueUsersService, PrismaService],
  exports: [RogueUsersService],
})
export class RogueUsersModule {}
