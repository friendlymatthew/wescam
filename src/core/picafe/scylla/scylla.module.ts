import { Global, Module } from "@nestjs/common";
import { Client, ClientOptions } from "cassandra-driver";

const contactPoints = ["127.0.0.1:9042"];
const keyspace = "picafe_chat";

const clientOptions: ClientOptions = {
	contactPoints,
	localDataCenter: "wesleyan",
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
