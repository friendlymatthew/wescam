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
exports.PicafeService = void 0;
const common_1 = require("@nestjs/common");
const cassandra_driver_1 = require("cassandra-driver");
let PicafeService = class PicafeService {
    constructor(cassandraClient) {
        this.cassandraClient = cassandraClient;
    }
    async createMessage(message) {
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
            throw new Error(`Failed to create a message: ${error.message}`);
        }
    }
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
};
exports.PicafeService = PicafeService;
exports.PicafeService = PicafeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)("SCYLLA_CLIENT")),
    __metadata("design:paramtypes", [cassandra_driver_1.Client])
], PicafeService);
//# sourceMappingURL=picafe.service.js.map