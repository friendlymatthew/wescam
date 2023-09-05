import {
	WebSocketGateway,
	SubscribeMessage,
	MessageBody,
	WebSocketServer,
	ConnectedSocket,
} from "@nestjs/websockets";
import { PicafeService } from "../services/picafe.service";
import { Server, Socket } from "socket.io";

@WebSocketGateway()
export class PicafeGateway {
	@WebSocketServer()
	server: Server;

	constructor(private readonly picafeService: PicafeService) {}

	private clients: Map<string, Socket> = new Map();

	@SubscribeMessage("connect-user")
	handleConnection(@ConnectedSocket() client: Socket): string {
		console.log("client succesfully connected!");

		return "client connected";
	}

	@SubscribeMessage("send-message")
	async sendMessage(
		@MessageBody() data: { roomId: string; senderId: string; message: string },
		@ConnectedSocket() client: Socket
	): Promise<void> {
		const updatedRoom = await this.picafeService.sendMessage(
			data.roomId,
			data.senderId,
			data.message
		);

		this.server.to(data.roomId).emit("new-message", updatedRoom);
	}

	@SubscribeMessage("join-room")
	handleJoinRoom(
		@MessageBody() data: { roomId: string; userId: string },
		@ConnectedSocket() client: Socket
	): void {
		client.join(data.roomId);
		console.log(`user ${data.userId} joined room ${data.roomId}`);
	}

	@SubscribeMessage("leaveRoom")
	handleLeaveRoom(
		@MessageBody() data: { roomId: string },
		@ConnectedSocket() client: Socket
	): void {
		client.leave(data.roomId);
		console.log(`Client ${client.id} left room ${data.roomId}`);
	}
}
