import {
	WebSocketGateway,
	SubscribeMessage,
	MessageBody,
	ConnectedSocket,
} from "@nestjs/websockets";
import { PicafeService } from "../service/picafe.service";
import { Message } from "../entities/message.entities";
import { Server, Socket } from "socket.io";
import { types } from "cassandra-driver";

@WebSocketGateway()
export class PicafeGateway {
	constructor(private readonly picafeService: PicafeService) {}

	@SubscribeMessage("createMessage")
	async createMessage(
		@MessageBody() message: Message,
		@ConnectedSocket() socket: Socket
	) {
		try {
			await this.picafeService.createMessage(message);
			socket.to("room123").emit("newMessage", message);
		} catch (error) {
			console.error(error);
		}
	}

	@SubscribeMessage("getMessagesByRoom")
	async getMessagesByRoom(@MessageBody() roomIdString: string) {
		// Corrected variable name
		try {
			const roomGuid: types.Uuid = types.Uuid.fromString(roomIdString); // Corrected variable name
			const messages = await this.picafeService.getMessagesByRoom(roomGuid);
			return messages;
		} catch (error) {
			console.error(error);
			return [];
		}
	}
}
