import { Global, Module } from "@nestjs/common";
import Pulsar, { Client } from "pulsar-client";
import { MiguelService } from "../service/miguel.service";

const miguel = new Client({
	serviceUrl: "pulsar://localhost:6650",
});

@Global()
@Module({
	providers: [
		{
			provide: "MIGUEL",
			useValue: miguel,
		},
		MiguelService,
	],
	exports: ["MIGUEL", MiguelService],
})
export class MiguelModule {}
