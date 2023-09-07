import { Inject, Injectable, Logger } from "@nestjs/common";
import { Message } from "../entities/message.entities";
import { Producer, ProducerMessage } from "pulsar-client";

export interface PicafeServiceInterface {
	createMessage(message: Message): Promise<void>;
}

@Injectable()
export class PicafeService implements PicafeServiceInterface {
	private readonly logger = new Logger(PicafeService.name);
	constructor(@Inject("MIGUEL") private readonly miguelProducer: Producer) {}

	async createMessage(message: Message): Promise<void> {
		try {
			this.sendMessageToProducer(message);
		} catch (error) {
			this.handleMessageFailure(error);
		}
	}

	private async sendMessageToProducer(message: Message) {
		const messageData: Buffer = Buffer.from(JSON.stringify(message));
		const producerMessage: ProducerMessage = {
			data: messageData,
			partitionKey: message.room_id.toString(),
		};

		await this.miguelProducer.send(producerMessage);
	}

	private handleMessageFailure(error: any) {
		this.logger.error(`Failed to handle message: ${error.message}`);
		throw new Error("Failed to handle message");
	}
}
