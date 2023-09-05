import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { CreateRogueUserDto } from '../dto/create-rogue-user.dto';

import { RogueUsersService } from '../rogue-users/rogue-users.service';
import { AbstractRogueUsers } from '../interfaces/abstract-rogue-users.interface';

export interface RogueUsersControllerInterface extends AbstractRogueUsers {
  createRogueUser(createRogueUserDto: CreateRogueUserDto): Promise<any>;
  isRogueUser(email: string): Promise<any>;
  removeRogueUser(email: string): Promise<any>;
}

@Controller('rogue-users')
export class RogueUsersController implements RogueUsersControllerInterface {
  constructor(private readonly rogueUsersService: RogueUsersService) {}

  @Post()
  createRogueUser(@Body() createRogueUserDto: CreateRogueUserDto) {
    return this.rogueUsersService.createRogueUser(createRogueUserDto);
  }

  @Get(':email')
  isRogueUser(@Param('email') email: string) {
    return this.rogueUsersService.isRogueUser(email);
  }

  @Delete(':email')
  removeRogueUser(@Param('email') email: string) {
    return this.rogueUsersService.removeRogueUser(email);
  }
}
