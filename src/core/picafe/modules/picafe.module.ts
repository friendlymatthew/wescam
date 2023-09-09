import { Module } from "@nestjs/common";
import { PicafeService } from "../service/picafe.service";
import { PicafeGateway } from "../gateway/picafe.gateway";
import { ScyllaModule } from "../../../database/scylla/scylla.module";
import { PulsarModule } from "./pulsar.module";
import { PulsarService } from "../service/pulsar.service";

@Module({
	imports: [ScyllaModule, PulsarModule],
	providers: [PicafeGateway, PicafeService, PulsarService],
})
export class PicafeModule {}
