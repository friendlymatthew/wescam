import { Module } from "@nestjs/common";
import { JuliaModule } from "./julia/modules/julia.module";
import { PrismaModule } from "src/database/prisma/prisma.module";
import { HolidayInnModule } from "./julia/modules/holidayinn.module";
import { EntityModule } from "./julia/modules/entity.module";
@Module({
	imports: [JuliaModule, PrismaModule, HolidayInnModule, EntityModule],
	exports: [JuliaModule, PrismaModule, HolidayInnModule, EntityModule],
})
export class CoreModule {}
