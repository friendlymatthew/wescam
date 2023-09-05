import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateRogueUserDto } from './dto/create-rogue-user.dto';
import { UpdateRogueUserDto } from './dto/update-rogue-user.dto';

import { RogueUsersService } from './rogue-users.service';

@Controller('Rogue-users')
export class RogueUsersController {
  constructor(private readonly RogueUsersService: RogueUsersService) {}

  @Post()
  create(@Body() createRogueUserDto: CreateRogueUserDto) {
    return this.RogueUsersService.create(createRogueUserDto);
  }

  @Get()
  findAll() {
    return this.RogueUsersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.RogueUsersService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRogueUserDto: UpdateRogueUserDto,
  ) {
    return this.RogueUsersService.update(+id, updateRogueUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.RogueUsersService.remove(+id);
  }
}
