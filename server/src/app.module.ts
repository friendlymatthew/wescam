import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ChattingModule } from './chatting/chatting.module';
import { PrismaService } from 'prisma/prisma.service';
import { UsersService } from './users/users.service';

@Module({
  imports: [UsersModule, ChattingModule],
  controllers: [AppController],
  providers: [AppService, PrismaService, UsersService],
})
export class AppModule {}
