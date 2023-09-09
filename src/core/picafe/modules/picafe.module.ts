import { Module } from "@nestjs/common";
import { PicafeService } from "../service/picafe.service";
import { PicafeGateway } from "../gateway/picafe.gateway";
import { ScyllaModule } from "../../../database/scylla/scylla.module";
import { MiguelModule } from "./miguel.module";
import { MiguelService } from "../service/miguel.service";

@Module({
	imports: [ScyllaModule, MiguelModule],
	providers: [PicafeGateway, PicafeService, MiguelService],
})
export class PicafeModule {}
