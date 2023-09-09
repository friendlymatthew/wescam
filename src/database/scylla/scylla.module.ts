import { Global, Module, OnModuleInit } from "@nestjs/common";
import { Client, ClientOptions } from "cassandra-driver";

function getContactPoints(): string[] {
	const defaultValue = ["127.0.0.1:9042"]; // localhost for now
	const envValue = process.env.SCYLLA_CONTACT_POINTS;

	return envValue ? envValue.split(",") : defaultValue;
}

const contactPoints = getContactPoints();
const keyspace = process.env.SCYLLA_KEYSPACE || "picafe_chat";

const clientOptions: ClientOptions = {
	contactPoints: [process.env.SCYLLA_CONTACT_POINTS || "localhost:9042"],
	localDataCenter: process.env.SCYLLA_LOCAL_DATACENTER || "datacenter1",
	keyspace: process.env.SCYLLA_KEYSPACE || "picafe_chat",
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
export class ScyllaModule implements OnModuleInit {
	async onModuleInit() {
		try {
			await client.connect();
			console.log("Connected to ScyllaDB");
		} catch (error) {
			console.log("Failed to connect to ScyllaDB", error);
			process.exit(1);
		}
	}
}
