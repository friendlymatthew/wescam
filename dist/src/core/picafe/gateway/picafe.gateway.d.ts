import { OnGatewayInit, OnGatewayConnection } from "@nestjs/websockets";
import { PicafeService } from "../service/picafe.service";
import { MiguelService } from "../service/miguel.service";
import { Message } from "../entities/message.entities";
import { Socket } from "socket.io";
import { types } from "cassandra-driver";
export declare class PicafeGateway implements OnGatewayInit, OnGatewayConnection {
    private readonly miguelService;
    private readonly picafeService;
    private server;
    constructor(miguelService: MiguelService, picafeService: PicafeService);
    afterInit(): void;
    handleConnection(client: Socket): void;
    handleJoinRoom(client: Socket, roomId: types.Uuid): Promise<void>;
    handleLeaveRoom(client: Socket, roomId: types.Uuid): Promise<void>;
    handleSendMessage(message: Message, client: Socket): Promise<void>;
}
