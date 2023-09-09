import { Message } from "../entities/message.entities";
import { Producer } from "pulsar-client";
import { Socket } from "socket.io";
import { PulsarService } from "./pulsar.service";
import { types } from "cassandra-driver";
export interface PicafeServiceInterface {
    createMessage(message: Message): Promise<void>;
}
export declare class PicafeService implements PicafeServiceInterface {
    private readonly pulsarProducer;
    private readonly pulsarService;
    private readonly logger;
    constructor(pulsarProducer: Producer, pulsarService: PulsarService);
    joinRoom(roomId: string, client: Socket): Promise<void>;
    leaveRoom(roomId: string, client: Socket): Promise<void>;
    getAllMessages(roomId: types.Uuid): Promise<Message[]>;
    createMessage(message: Message): Promise<void>;
    private sendMessageToProducer;
    private handleMessageFailure;
}
