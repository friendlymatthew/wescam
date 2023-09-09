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
var PulsarService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PulsarService = void 0;
const common_1 = require("@nestjs/common");
const pulsar_client_1 = require("pulsar-client");
const cassandra_driver_1 = require("cassandra-driver");
let PulsarService = PulsarService_1 = class PulsarService {
    constructor(pulsar, cassandraClient) {
        this.pulsar = pulsar;
        this.cassandraClient = cassandraClient;
        this.roomConsumers = {};
        this.roomMessageQueues = {};
        this.logger = new common_1.Logger(PulsarService_1.name);
    }
    async onModuleInit() { }
    async get_X_MessagesByRoom(roomId, x) {
        if (x <= 0) {
            throw new Error("x must be greater than 0");
        }
        const query = `
	  SELECT * FROM messages
	  WHERE room_id = ?
	  ORDER BY timestamp DESC
	  LIMIT ${x.toString()}
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
    async getMessagesByRoom(roomId) {
        const query = `
      SELECT * FROM messages
      WHERE room_id = ?
	  ORDER BY timestamp ASC
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
    async pairConsumerToRoom(roomId) {
        if (this.roomConsumers[roomId]) {
            this.logger.log(`Consumer for room ${roomId} already exists.`);
            this.listenToConsumer(this.roomConsumers[roomId], roomId);
            return;
        }
        const topic = `persistent://public/default/picafe-chat-topic-${roomId}`;
        const consumer = await this.pulsar.subscribe({
            topic,
            subscription: `picafe-chat-subscription-${roomId}`,
        });
        this.roomConsumers[roomId] = consumer;
        this.roomMessageQueues[roomId] = [];
        this.listenToConsumer(consumer, roomId);
    }
    async writeMessageToDB(message) {
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
            this.logger.log(`Successfully pushed batch to ScyllaDB for room ${message.room_id}`);
        }
        catch (error) {
            this.logger.error(`Failed to push batch to ScyllaDB: ${error.message}`);
        }
    }
    async listenToConsumer(consumer, roomId) {
        while (true) {
            const msg = await consumer.receive();
            const messageData = JSON.parse(msg.getData().toString());
            this.writeMessageToDB(messageData);
            consumer.acknowledge(msg);
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
exports.PulsarService = PulsarService;
exports.PulsarService = PulsarService = PulsarService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)("PULSAR")),
    __param(1, (0, common_1.Inject)("SCYLLA_CLIENT")),
    __metadata("design:paramtypes", [pulsar_client_1.Client,
        cassandra_driver_1.Client])
], PulsarService);
//# sourceMappingURL=pulsar.service.js.map