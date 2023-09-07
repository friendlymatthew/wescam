import { OnModuleInit } from "@nestjs/common";
import { Client } from "pulsar-client";
import { Message } from "../entities/message.entities";
import { types, Client as CassandraClient } from "cassandra-driver";
export interface MigeulServiceInterface {
}
export declare class MiguelService implements OnModuleInit {
    private readonly miguel;
    private readonly cassandraClient;
    private roomConsumers;
    constructor(miguel: Client, cassandraClient: CassandraClient);
    onModuleInit(): Promise<void>;
    getMessagesByRoom(roomId: types.Uuid): Promise<Message[]>;
    createConsumerForRoom(roomId: string): Promise<void>;
    private listenToConsumer;
    private pushToScylla;
    closeoutConsumerForRoom(roomId: string): Promise<void>;
}
