import { Inject, Injectable, Logger } from "@nestjs/common";
import { Message } from "../entities/message.entities";
import { Producer, ProducerMessage } from "pulsar-client";
import { Socket } from "socket.io";
import { PulsarService } from "./pulsar.service";
import { types } from "cassandra-driver";

export interface PicafeServiceInterface {
	createMessage(message: Message): Promise<void>;
}

@Injectable()
export class PicafeService implements PicafeServiceInterface {
	private readonly logger = new Logger(PicafeService.name);

	constructor(
		@Inject("PULSAR") private readonly pulsarProducer: Producer,
		private readonly pulsarService: PulsarService
	) {}

	async joinRoom(roomId: string, client: Socket): Promise<void> {
		try {
			await this.pulsarService.pairConsumerToRoom(roomId);
			client.join(roomId);
			this.logger.log(`Client ${client.id} joined room ${roomId}`);
		} catch (error) {
			this.logger.error(`Failed to join room: ${error.message}`);
		}
	}

	async leaveRoom(roomId: string, client: Socket): Promise<void> {
		try {
			await this.pulsarService.closeoutConsumerForRoom(roomId);
			client.leave(roomId);
			this.logger.log(`Client ${client.id} left room ${roomId}`);
		} catch (error) {
			this.logger.error(`Failed to leave room: ${error.message}`);
		}
	}

	async getAllMessages(roomId: types.Uuid): Promise<Message[]> {
		try {
			const messages = await this.pulsarService.getMessagesByRoom(roomId);
			this.logger.log(`Fetched messages for room ${roomId}`);
			return messages;
		} catch (error) {
			this.logger.error(
				`Failed to fetch messages for room ${roomId}: ${error.message}`
			);
			throw error;
		}
	}

	async createMessage(message: Message): Promise<void> {
		try {
			await this.sendMessageToProducer(message);
		} catch (error) {
			this.handleMessageFailure(error);
			throw error;
		}
	}

	private async sendMessageToProducer(message: Message) {
		try {
			const messageData: Buffer = Buffer.from(JSON.stringify(message));
			const producerMessage: ProducerMessage = {
				data: messageData,
				partitionKey: message.room_id.toString(),
			};
			await this.pulsarProducer.send(producerMessage);
			this.logger.log(`Sent message to producer: ${JSON.stringify(message)}`);
		} catch (error) {
			this.logger.error(`Failed to send message to producer: ${error.message}`);
		}
	}

	private handleMessageFailure(error: any) {
		this.logger.error(`Failed to handle message: ${error.message}`);
		throw new Error("Failed to handle message");
	}
}
