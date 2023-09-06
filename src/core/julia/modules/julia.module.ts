import { Global, Module } from "@nestjs/common";
import { JuliaService } from "../service/julia.service";

@Global()
@Module({
	providers: [JuliaService],
	exports: [JuliaService],
})
export class JuliaModule {}
