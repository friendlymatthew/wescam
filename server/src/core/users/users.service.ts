import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { Prisma, User as PrismaUser } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ResponseWrapper } from 'src/core/wrappers/response-wrapper.model';
import { ErrorResponseWrapper } from '../wrappers/error-response-wrapper.model';
import { RogueUsersService } from '../rogue-users/rogue-users.service';

export interface UsersInterface {
  /* onboarding users, we query for rogue user here*/
  createUser(
    createUserDto: CreateUserDto,
  ): Promise<ResponseWrapper<PrismaUser>>;

  getUser(id: string): Promise<PrismaUser>;

  deleteUser(id: string): Promise<void>;

  updateUser(id: string, updateUserDto: UpdateUserDto): Promise<PrismaUser>;
}

@Injectable()
export class UsersService implements UsersInterface {
  constructor(
    private readonly prisma: PrismaService,
    private readonly rogueUsersService: RogueUsersService,
  ) {} // Inject PrismaService AND rogueUsersService

  async createUser(
    createUserDto: CreateUserDto,
  ): Promise<ResponseWrapper<PrismaUser>> {
    try {
      const { name, email, pronoun, classYear } = createUserDto;

      const newUser: Prisma.UserCreateInput = {
        name,
        email,
        pronoun,
        classYear,
      };

      const rogueResponse = await this.rogueUsersService.isRogueUser(email);

      if (rogueResponse.success) {
        newUser.id = rogueResponse.data;

        await this.rogueUsersService.removeRogueUser(email);
      }

      const createdUser = await this.prisma.user.create({
        data: newUser,
      });

      return new ResponseWrapper('User created', createdUser, true);
    } catch (error) {
      return new ErrorResponseWrapper('User not created', error, false);
    }
  }

  async getUser(id: string): Promise<PrismaUser> {
    const user = await this.prisma.user.findUnique({ where: { id } });

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  async findAll(): Promise<PrismaUser[]> {
    return await this.prisma.user.findMany();
  }

  async updateUser(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<PrismaUser> {
    const user = await this.getUser(id);
    const updatedUser: Prisma.UserUpdateInput = {
      ...updateUserDto,
    };

    return await this.prisma.user.update({
      where: { id: user.id },
      data: updatedUser,
    });
  }

  async deleteUser(id: string): Promise<void> {
    const user = await this.getUser(id);
    await this.prisma.user.delete({
      where: { id: user.id },
    });
  }
}
