import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { Prisma, RogueUser as PrismaRogueUser } from '@prisma/client';
import { ResponseWrapper } from '../wrappers/response-wrapper.model';
import { ErrorResponseWrapper } from '../wrappers/error-response-wrapper.model';
import { CreateRogueUserDto } from './dto/create-rogue-user.dto';
import { AbstractRogueUsers } from './interfaces/abstract-rogue-users.interface';

export interface RogueUsersInterface extends AbstractRogueUsers {
  /* if crush not User, create Rogue User */
  createRogueUser(
    createRogueUserDto: CreateRogueUserDto,
  ): Promise<PrismaRogueUser>;

  /* checks if user is rogue */
  isRogueUser(email: string): Promise<ResponseWrapper<string | null>>;

  /* upon onboarding, if person has admirers, after we pass Rogue user id, we should remove */
  removeRogueUser(email: string): Promise<void>;
}

@Injectable()
export class RogueUsersService implements RogueUsersInterface {
  constructor(private readonly prisma: PrismaService) {}

  async createRogueUser(
    createRogueUserDto: CreateRogueUserDto,
  ): Promise<PrismaRogueUser> {
    const { email } = createRogueUserDto;
    const newRogueUser: Prisma.RogueUserCreateInput = {
      email,
    };

    return await this.prisma.rogueUser.create({
      data: newRogueUser,
    });
  }

  async isRogueUser(email: string): Promise<ResponseWrapper<string>> {
    const rogueUser = await this.prisma.rogueUser.findUnique({
      where: { email },
    });

    if (!rogueUser) {
      return new ErrorResponseWrapper('User not found', '', false);
    }

    return new ResponseWrapper('Rogue user found', rogueUser.id, true);
  }

  async removeRogueUser(email: string): Promise<void> {
    const rogueUser = await this.prisma.rogueUser.findUnique({
      where: { email },
    });

    if (!rogueUser) {
      throw new NotFoundException(`Rogue User with email ${email} not found`);
    }

    await this.prisma.rogueUser.delete({
      where: { email },
    });
  }
}
