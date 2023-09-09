import { OnGatewayInit, OnGatewayConnection } from "@nestjs/websockets";
import { PicafeService } from "../service/picafe.service";
import { PulsarService } from "../service/pulsar.service";
import { Message } from "../entities/message.entities";
import { Server, Socket } from "socket.io";
import { types } from "cassandra-driver";
export declare class PicafeGateway implements OnGatewayInit, OnGatewayConnection {
    private readonly miguelService;
    private readonly picafeService;
    server: Server;
    constructor(miguelService: PulsarService, picafeService: PicafeService);
    afterInit(): void;
    handleConnection(client: Socket): void;
    handleJoinRoom(client: Socket, roomId: types.Uuid): Promise<void>;
    handleLeaveRoom(client: Socket, roomId: types.Uuid): Promise<void>;
    handleSendMessage(message: Message, client: Socket): Promise<void>;
    handleFetchAllMessages(client: Socket, roomId: types.Uuid): Promise<void>;
}
