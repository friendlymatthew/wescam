import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CupidService } from '../picafe/services/cupid.service';
import { CreateCupidDto } from './dto/create-cupid.dto';
import { UpdateCupidDto } from './dto/update-cupid.dto';

@Controller('cupid')
export class CupidController {
  constructor(private readonly cupidService: CupidService) {}

  @Post()
  create(@Body() createCupidDto: CreateCupidDto) {
    return this.cupidService.create(createCupidDto);
  }

  @Get()
  findAll() {
    return this.cupidService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cupidService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCupidDto: UpdateCupidDto) {
    return this.cupidService.update(+id, updateCupidDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cupidService.remove(+id);
  }
}
