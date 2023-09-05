import { Module } from '@nestjs/common';
import { CupidService } from '../picafe/services/cupid.service';
import { CupidController } from './cupid.controller';

@Module({
  controllers: [CupidController],
  providers: [CupidService],
})
export class CupidModule {}
