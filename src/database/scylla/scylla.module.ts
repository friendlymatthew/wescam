import { Global, Module } from "@nestjs/common";
import { Client, ClientOptions } from "cassandra-driver";

function getContactPoints(): string[] {
	const defaultValue = ["127.0.0.1:9042"];
	const envValue = process.env.SCYLLA_CONTACT_POINTS;

	return envValue ? envValue.split(",") : defaultValue;
}

const contactPoints = getContactPoints();
const keyspace = process.env.SCYLLA_KEYSPACE || "picafe_chat";

const clientOptions: ClientOptions = {
	contactPoints,
	localDataCenter: process.env.SCYLLA_LOCAL_DATACENTER || "wesleyan",
	keyspace,
};

const client = new Client(clientOptions);

@Global()
@Module({
	providers: [
		{
			provide: "SCYLLA_CLIENT",
			useValue: client,
		},
	],
	exports: ["SCYLLA_CLIENT"],
})
export class ScyllaModule {}
