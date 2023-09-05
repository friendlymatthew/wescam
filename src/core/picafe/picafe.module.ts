import { Module } from '@nestjs/common';
import { PicafeService } from './picafe.service';
import { PicafeGateway } from './picafe.gateway';

@Module({
  providers: [PicafeGateway, PicafeService],
})
export class PicafeModule {}
