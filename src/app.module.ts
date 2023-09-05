import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { JuliaModule } from './core/julia/modules/julia.module';

@Module({
  imports: [JuliaModule],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
