import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { Prisma, User as PrismaUser } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {} // Inject PrismaService

  async create(createUserDto: CreateUserDto): Promise<PrismaUser> {
    const { name, email, pronoun, classYear } = createUserDto;
    const newUser: Prisma.UserCreateInput = {
      name,
      email,
      pronoun,
      classYear,
    };

    return await this.prisma.user.create({
      data: newUser,
    });
  }

  async findAll(): Promise<PrismaUser[]> {
    return await this.prisma.user.findMany();
  }

  async findOne(id: string): Promise<PrismaUser> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<PrismaUser> {
    const user = await this.findOne(id);
    const updatedUser: Prisma.UserUpdateInput = {
      ...updateUserDto,
    };

    return await this.prisma.user.update({
      where: { id: user.id },
      data: updatedUser,
    });
  }

  async remove(id: string): Promise<void> {
    const user = await this.findOne(id);
    await this.prisma.user.delete({
      where: { id: user.id },
    });
  }
}
