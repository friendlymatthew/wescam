import { Module } from "@nestjs/common";
import { JuliaModule } from "./julia/modules/julia.module";
import { PrismaModule } from "src/database/prisma/prisma.module";
@Module({
	imports: [JuliaModule, PrismaModule],
	exports: [JuliaModule, PrismaModule],
})
export class CoreModule {}
