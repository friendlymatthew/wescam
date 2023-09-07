"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MiguelService = void 0;
const common_1 = require("@nestjs/common");
const pulsar_client_1 = require("pulsar-client");
const cassandra_driver_1 = require("cassandra-driver");
let MiguelService = class MiguelService {
    constructor(miguel, cassandraClient) {
        this.miguel = miguel;
        this.cassandraClient = cassandraClient;
        this.roomConsumers = {};
    }
    async onModuleInit() { }
    async getMessagesByRoom(roomId) {
        const query = `
      SELECT * FROM messages
      WHERE room_id = ?
    `;
        try {
            const result = await this.cassandraClient.execute(query, [roomId], {
                prepare: true,
            });
            const messages = result.rows.map((row) => ({
                message_id: row.message_id,
                room_id: row.room_id,
                sender_id: row.sender_id,
                content: row.content,
                timestamp: row.timestamp,
                medialink: row.medialink,
            }));
            return messages;
        }
        catch (error) {
            throw new Error(`Failed to fetch messages: ${error.message}`);
        }
    }
    async createConsumerForRoom(roomId) {
        const topic = `persistent://public/default/picafe-chat-topic-${roomId}`;
        const consumer = await this.miguel.subscribe({
            topic,
            subscription: `picafe-chat-subscription-${roomId}`,
        });
        this.roomConsumers[roomId] = consumer;
        this.listenToConsumer(consumer, roomId);
    }
    async listenToConsumer(consumer, roomId) {
        while (true) {
            const msg = await consumer.receive();
            const messageData = JSON.parse(msg.getData().toString());
            await this.pushToScylla(messageData);
            consumer.acknowledge(msg);
        }
    }
    async pushToScylla(message) {
        const query = `
      INSERT INTO messages (message_id, room_id, sender_id, content, timestamp, medialink)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
        const params = [
            message.message_id,
            message.room_id,
            message.sender_id,
            message.content,
            message.timestamp,
            message.medialink,
        ];
        try {
            await this.cassandraClient.execute(query, params, { prepare: true });
        }
        catch (error) {
            throw new Error(`Failed to push message to Scylla: ${error.message}`);
        }
    }
    async closeoutConsumerForRoom(roomId) {
        const consumer = this.roomConsumers[roomId];
        if (consumer) {
            await consumer.unsubscribe();
            await consumer.close();
            delete this.roomConsumers[roomId];
        }
    }
};
exports.MiguelService = MiguelService;
exports.MiguelService = MiguelService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)("MIGUEL")),
    __param(1, (0, common_1.Inject)("SCYLLA_CLIENT")),
    __metadata("design:paramtypes", [pulsar_client_1.Client,
        cassandra_driver_1.Client])
], MiguelService);
//# sourceMappingURL=miguel.service.js.map