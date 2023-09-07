import { OnModuleDestroy, OnModuleInit } from "@nestjs/common";
export declare class ZookeeperService implements OnModuleInit, OnModuleDestroy {
    private client;
    private readonly logger;
    constructor();
    onModuleInit(): Promise<void>;
    onModuleDestroy(): Promise<void>;
    private connectToZookeeper;
}
