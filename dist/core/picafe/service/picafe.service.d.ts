import { Message } from "../entities/message.entities";
import { Client, types } from "cassandra-driver";
export interface PicafeServiceInterface {
    createMessage(message: Message): Promise<void>;
    getMessagesByRoom(roomId: types.Uuid): Promise<Message[]>;
}
export declare class PicafeService implements PicafeServiceInterface {
    private readonly cassandraClient;
    constructor(cassandraClient: Client);
    createMessage(message: Message): Promise<void>;
    getMessagesByRoom(roomId: types.Uuid): Promise<Message[]>;
}
