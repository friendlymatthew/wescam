import { Module } from "@nestjs/common";
import { HolidayInnResolver } from "../resolvers/holidayinn.resolvers";
import { HolidayInnService } from "../service/holidayinn.service";

@Module({
	providers: [HolidayInnResolver, HolidayInnService],
})
export class HolidayInnModule {}
