import { Inject, Injectable } from "@nestjs/common";
import { Message } from "../entities/message.entities";
import { Client, types } from "cassandra-driver";

export interface PicafeServiceInterface {
	createMessage(message: Message): Promise<void>;
	getMessagesByRoom(roomId: types.Uuid): Promise<Message[]>;
	//getUnreadMessagesForUser(userId: types.Uuid): Promise<Message[]>;
}

@Injectable()
export class PicafeService implements PicafeServiceInterface {
	constructor(
		@Inject("SCYLLA_CLIENT") private readonly cassandraClient: Client
	) {}

	async createMessage(message: Message): Promise<void> {
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
			throw new Error(`Failed to create a message: ${error.message}`);
		}
	}

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
}
