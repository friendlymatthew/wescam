import {
	WebSocketGateway,
	SubscribeMessage,
	MessageBody,
	ConnectedSocket,
	OnGatewayInit,
	OnGatewayConnection,
	WebSocketServer,
} from "@nestjs/websockets";
import { PicafeService } from "../service/picafe.service";
import { PulsarService } from "../service/pulsar.service";
import { Message } from "../entities/message.entities";
import { Server, Socket } from "socket.io";
import { types } from "cassandra-driver";

@WebSocketGateway()
export class PicafeGateway implements OnGatewayInit, OnGatewayConnection {
	@WebSocketServer()
	public server: Server;
	constructor(
		private readonly miguelService: PulsarService,
		private readonly picafeService: PicafeService
	) {}

	afterInit() {
		console.log("picafe gateway initalized");
	}

	handleConnection(client: Socket) {
		console.log("client connected: ", client.id);
	}

	@SubscribeMessage("joinRoom")
	async handleJoinRoom(client: Socket, roomId: types.Uuid): Promise<void> {
		try {
			await this.miguelService.createConsumerForRoom(roomId.toString());
			client.join(roomId.toString());
			this.server
				.to(roomId.toString())
				.emit("user has joined", { userId: client.id, roomId });
		} catch (error) {
			client.emit("error", "Failed to join room : " + error.message);
		}
	}

	@SubscribeMessage("leaveRoom")
	async handleLeaveRoom(client: Socket, roomId: types.Uuid): Promise<void> {
		// Corrected variable name
		try {
			await this.miguelService.closeoutConsumerForRoom(roomId.toString());
			client.leave(roomId.toString());

			this.server
				.to(roomId.toString())
				.emit("user has left", { userId: client.id, roomId });
		} catch (error) {
			client.emit("error", "Failed to leave room : " + error.message);
		}
	}

	@SubscribeMessage("sendMessage")
	async handleSendMessage(
		@MessageBody() message: Message,
		@ConnectedSocket() client: Socket
	): Promise<void> {
		try {
			const roomId = message.room_id;
			await this.picafeService.createMessage(message);
			this.server.to(roomId.toString()).emit("newMessage", message);
		} catch (error) {
			client.emit("error", "Failed to send message : " + error.message);
		}
	}

	@SubscribeMessage("fetchAllMessages")
	async handleFetchAllMessages(
		client: Socket,
		roomId: types.Uuid
	): Promise<void> {
		try {
			const messages = await this.miguelService.getMessagesByRoom(roomId);
			client.emit("allMessages", messages);
		} catch (error) {
			client.emit("error", "Failed to fetch all messages : " + error.message);
		}
	}
}
