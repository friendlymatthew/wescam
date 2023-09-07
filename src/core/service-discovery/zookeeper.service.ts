import {
	Injectable,
	Logger,
	OnModuleDestroy,
	OnModuleInit,
} from "@nestjs/common";
import zookeeper from "node-zookeeper-client";

@Injectable()
export class ZookeeperService implements OnModuleInit, OnModuleDestroy {
	private client: any;
	private readonly logger = new Logger(ZookeeperService.name);

	constructor() {
		this.client = zookeeper.createClient("localhost:2181");
	}

	async onModuleInit() {
		this.connectToZookeeper();
	}

	async onModuleDestroy() {
		this.client.close();
	}

	private connectToZookeeper() {
		this.client.once("connected", () => {
			this.logger.log("Connected to Zookeeper");
		});
	}
}
