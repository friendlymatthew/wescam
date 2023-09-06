import { Module } from "@nestjs/common";
import { PicafeService } from "./service/picafe.service";
import { PicafeGateway } from "./gateway/picafe.gateway";
import { ScyllaModule } from "./scylla/scylla.module";

@Module({
	imports: [ScyllaModule],
	providers: [PicafeGateway, PicafeService],
})
export class PicafeModule {}
