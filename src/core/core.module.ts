import { Module } from "@nestjs/common";
import { JuliaModule } from "./julia/modules/julia.module";
import { PrismaModule } from "src/database/prisma/prisma.module";
import { HolidayInnModule } from "./julia/modules/holidayinn.module";
import { EntityModule } from "./julia/modules/entity.module";
import { PicafeModule } from "./picafe/modules/picafe.module";
@Module({
	imports: [
		JuliaModule,
		PrismaModule,
		HolidayInnModule,
		EntityModule,
		PicafeModule,
	],
	exports: [
		JuliaModule,
		PrismaModule,
		HolidayInnModule,
		EntityModule,
		PicafeModule,
	],
})
export class CoreModule {}
