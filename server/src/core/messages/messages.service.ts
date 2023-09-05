import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { Prisma, Message as PrismaMessage } from '@prisma/client';

@Injectable()
export class MessagesService {
  constructor(private readonly prisma: PrismaService) {} // Inject PrismaService

  async create(createMessageDto: CreateMessageDto): Promise<PrismaMessage> {
    const { id, senderId, roomId, messageType, content, timestamp } =
      createMessageDto;

    const newMessage: Prisma.MessageCreateInput = {
      id: id,
      senderId: senderId,
      roomId: roomId,
      messageType: messageType,
      content: content,
      timestamp: timestamp,
    };

    return await this.prisma.message.create({
      data: newMessage,
    });
  }

  async findAll(): Promise<PrismaMessage[]> {
    return await this.prisma.message.findMany();
  }

  async findByRoom(roomId: string): Promise<PrismaMessage[]> {
    const message = await this.prisma.message.findMany({
      where: { roomId: roomId },
    });

    if (!message) {
      throw new NotFoundException(`Message with roomId ${roomId} not found`);
    }

    return message;
  }

  async findOne(id: string): Promise<PrismaMessage> {
    const message = await this.prisma.message.findUnique({
      where: { id },
    });

    if (!message) {
      throw new NotFoundException(`Message with id ${id} not found`);
    }

    return message;
  }

  async update(
    id: string,
    updateMessageDto: UpdateMessageDto,
  ): Promise<PrismaMessage> {
    const message = await this.findOne(id);

    const updatedMessage: Prisma.MessageUpdateInput = {
      ...updateMessageDto,
    };

    return await this.prisma.message.update({
      where: { id: message.id },
      data: updatedMessage,
    });
  }

  async remove(id: string): Promise<void> {
    const message = await this.findOne(id);

    await this.prisma.message.delete({
      where: { id: message.id },
    });
  }
}
