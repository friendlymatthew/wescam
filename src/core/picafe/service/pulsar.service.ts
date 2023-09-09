import { Inject, Injectable, Logger, OnModuleInit } from "@nestjs/common";
import { Client, Consumer, Producer } from "pulsar-client";
import { Message } from "../entities/message.entities";
import { types, Client as CassandraClient } from "cassandra-driver";

@Injectable()
export class PulsarService implements OnModuleInit {
	private roomConsumers: { [key: string]: Consumer } = {};
	private roomMessageQueues: { [key: string]: Message[] } = {};

	private readonly logger = new Logger(PulsarService.name);

	constructor(
		@Inject("PULSAR") private readonly pulsar: Client,
		@Inject("SCYLLA_CLIENT") private readonly cassandraClient: CassandraClient
	) {}

	async onModuleInit(): Promise<void> {}

	async get_X_MessagesByRoom(
		roomId: types.Uuid,
		x: number
	): Promise<Message[]> {
		if (x <= 0) {
			throw new Error("x must be greater than 0");
		}

		const query = `
	  SELECT * FROM messages
	  WHERE room_id = ?
	  ORDER BY timestamp DESC
	  LIMIT ${x.toString()}
	`;

		try {
			const result = await this.cassandraClient.execute(query, [roomId], {
				prepare: true,
			});

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

	async getMessagesByRoom(roomId: types.Uuid): Promise<Message[]> {
		const query = `
      SELECT * FROM messages
      WHERE room_id = ?
	  ORDER BY timestamp ASC
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

	async pairConsumerToRoom(roomId: string): Promise<void> {
		if (this.roomConsumers[roomId]) {
			this.logger.log(`Consumer for room ${roomId} already exists.`);
			this.listenToConsumer(this.roomConsumers[roomId], roomId);
			return;
		}

		const topic = `persistent://public/default/picafe-chat-topic-${roomId}`;
		const consumer = await this.pulsar.subscribe({
			topic,
			subscription: `picafe-chat-subscription-${roomId}`,
		});
		this.roomConsumers[roomId] = consumer;
		this.roomMessageQueues[roomId] = [];
		this.listenToConsumer(consumer, roomId);
	}

	private async writeMessageToDB(message: Message): Promise<void> {
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
			this.logger.log(
				`Successfully pushed batch to ScyllaDB for room ${message.room_id}`
			);
		} catch (error) {
			this.logger.error(`Failed to push batch to ScyllaDB: ${error.message}`);
		}
	}

	private async listenToConsumer(consumer: Consumer, roomId: string) {
		while (true) {
			const msg = await consumer.receive();
			const messageData: Message = JSON.parse(msg.getData().toString());

			this.writeMessageToDB(messageData);
			consumer.acknowledge(msg);
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
