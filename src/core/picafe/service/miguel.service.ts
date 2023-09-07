import { Inject, Injectable, OnModuleInit } from "@nestjs/common";
import { Client, Consumer, Producer } from "pulsar-client";
import { Message } from "../entities/message.entities";
import { PicafeService } from "./picafe.service";
import { types, Client as CassandraClient } from "cassandra-driver";

export interface MigeulServiceInterface {}

@Injectable()
export class MiguelService implements OnModuleInit {
	private roomConsumers: { [key: string]: Consumer } = {};

	constructor(
		@Inject("MIGUEL") private readonly miguel: Client,
		@Inject("SCYLLA_CLIENT") private readonly cassandraClient: CassandraClient
	) {}

	async onModuleInit(): Promise<void> {}

	async getMessagesByRoom(roomId: types.Uuid): Promise<Message[]> {
		const query = `
      SELECT * FROM messages
      WHERE room_id = ?
    `;

		try {
			const result = await this.cassandraClient.execute(query, [roomId], {
				prepare: true,
			});

			// Map the result rows to Message objects
			const messages: Message[] = result.rows.map((row) => ({
				message_id: row.message_id,
				room_id: row.room_id,
				sender_id: row.sender_id,
				content: row.content,
				timestamp: row.timestamp,
				medialink: row.medialink,
			}));

			return messages;
		} catch (error) {
			throw new Error(`Failed to fetch messages: ${error.message}`);
		}
	}

	async createConsumerForRoom(roomId: string): Promise<void> {
		const topic = `persistent://public/default/picafe-chat-topic-${roomId}`;
		const consumer = await this.miguel.subscribe({
			topic,
			subscription: `picafe-chat-subscription-${roomId}`,
		});
		this.roomConsumers[roomId] = consumer;
		this.listenToConsumer(consumer, roomId);
	}

	private async listenToConsumer(consumer: Consumer, roomId: string) {
		while (true) {
			const msg = await consumer.receive();
			const messageData: Message = JSON.parse(msg.getData().toString());
			await this.pushToScylla(messageData);
			consumer.acknowledge(msg);
		}
	}

	private async pushToScylla(message: Message): Promise<void> {
		const query = `
      INSERT INTO messages (message_id, room_id, sender_id, content, timestamp, medialink)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

		const params = [
			message.message_id,
			message.room_id,
			message.sender_id,
			message.content,
			message.timestamp,
			message.medialink,
		];

		try {
			await this.cassandraClient.execute(query, params, { prepare: true });
		} catch (error) {
			throw new Error(`Failed to push message to Scylla: ${error.message}`);
		}
	}

	async closeoutConsumerForRoom(roomId: string): Promise<void> {
		const consumer = this.roomConsumers[roomId];
		if (consumer) {
			await consumer.unsubscribe();
			await consumer.close();
			delete this.roomConsumers[roomId];
		}
	}
}
