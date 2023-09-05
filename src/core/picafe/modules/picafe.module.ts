import { Module } from '@nestjs/common';
import { PicafeService } from '../services/picafe.service';
import { PicafeGateway } from '../gateway/picafe.gateway';

@Module({
  providers: [PicafeGateway, PicafeService],
})
export class PicafeModule {}
