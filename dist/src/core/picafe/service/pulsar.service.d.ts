import { OnModuleInit } from "@nestjs/common";
import { Client } from "pulsar-client";
import { Message } from "../entities/message.entities";
import { types, Client as CassandraClient } from "cassandra-driver";
export declare class PulsarService implements OnModuleInit {
    private readonly pulsar;
    private readonly cassandraClient;
    private roomConsumers;
    private roomMessageQueues;
    private readonly logger;
    constructor(pulsar: Client, cassandraClient: CassandraClient);
    onModuleInit(): Promise<void>;
    get_X_MessagesByRoom(roomId: types.Uuid, x: number): Promise<Message[]>;
    getMessagesByRoom(roomId: types.Uuid): Promise<Message[]>;
    pairConsumerToRoom(roomId: string): Promise<void>;
    private writeMessageToDB;
    private listenToConsumer;
    closeoutConsumerForRoom(roomId: string): Promise<void>;
}
