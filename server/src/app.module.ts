import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { UsersModule } from './core/users/users.module';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { UsersService } from './core/users/users.service';
import { RoomsModule } from './core/rooms/rooms.module';
import { MessagesModule } from './core/messages/messages.module';

@Module({
  imports: [UsersModule, RoomsModule, MessagesModule],
  controllers: [],
  providers: [AppService, UsersService, PrismaService],
})
export class AppModule {}
