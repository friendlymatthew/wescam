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
import { Logger } from "@nestjs/common";

@WebSocketGateway()
export class PicafeGateway implements OnGatewayInit, OnGatewayConnection {
	private readonly logger = new Logger(PicafeGateway.name);

	@WebSocketServer()
	public server: Server;
	constructor(private readonly picafeService: PicafeService) {}

	afterInit() {
		this.logger.log("Gateway successfully initalized");
	}

	handleConnection(client: Socket) {
		this.logger.log(`Client connected: ${client.id}`);
	}

	@SubscribeMessage("joinRoom")
	async handleJoinRoom(client: Socket, roomId: types.Uuid): Promise<void> {
		try {
			await this.picafeService.joinRoom(roomId.toString(), client);
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
			await this.picafeService.leaveRoom(roomId.toString(), client);
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
			await this.picafeService.getAllMessages(roomId);
		} catch (error) {
			client.emit("error", "Failed to fetch all messages : " + error.message);
		}
	}
}
