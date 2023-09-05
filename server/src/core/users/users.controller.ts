import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AbstractUsers } from './interfaces/abstract-users.interface';
import { User as PrismaUser } from '@prisma/client';
export interface UsersControllerInterface extends AbstractUsers {
  createUser(createUserDto: CreateUserDto): Promise<any>;
  getAllUsers(): Promise<PrismaUser[]>;
  getUser(id: string): Promise<PrismaUser>;
  updateUser(id: string, updateUserDto: UpdateUserDto): Promise<PrismaUser>;
  deleteUser(id: string): Promise<void>;
}

@Controller('users')
export class UsersController implements UsersControllerInterface {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @Get()
  getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @Get(':id')
  getUser(@Param('id') id: string) {
    return this.usersService.getUser(id);
  }

  @Patch(':id')
  updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.usersService.deleteUser(id);
  }
}
