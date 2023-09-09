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
    private readonly BATCH_SIZE;
    private readonly QUEUE_FLUSH_INTERVAL_MS;
    constructor(pulsar: Client, cassandraClient: CassandraClient);
    onModuleInit(): Promise<void>;
    getMessagesByRoom(roomId: types.Uuid): Promise<Message[]>;
    private flushAllQueues;
    private pushBatchToScylla;
    createConsumerForRoom(roomId: string): Promise<void>;
    private listenToConsumer;
    closeoutConsumerForRoom(roomId: string): Promise<void>;
}
