import { Global, Module } from "@nestjs/common";
import Pulsar, { Client } from "pulsar-client";
import { PulsarService } from "../service/pulsar.service";

const pulsar = new Client({
	serviceUrl: "pulsar://pulsar:6650",
});

@Global()
@Module({
	providers: [
		{
			provide: "PULSAR",
			useValue: pulsar,
		},
		PulsarService,
	],
	exports: ["PULSAR", PulsarService],
})
export class PulsarModule{}
