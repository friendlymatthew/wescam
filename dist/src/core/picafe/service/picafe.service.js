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
var PicafeService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PicafeService = void 0;
const common_1 = require("@nestjs/common");
const pulsar_client_1 = require("pulsar-client");
const pulsar_service_1 = require("./pulsar.service");
let PicafeService = PicafeService_1 = class PicafeService {
    constructor(pulsarProducer, pulsarService) {
        this.pulsarProducer = pulsarProducer;
        this.pulsarService = pulsarService;
        this.logger = new common_1.Logger(PicafeService_1.name);
    }
    async joinRoom(roomId, client) {
        try {
            await this.pulsarService.pairConsumerToRoom(roomId);
            client.join(roomId);
            this.logger.log(`Client ${client.id} joined room ${roomId}`);
        }
        catch (error) {
            this.logger.error(`Failed to join room: ${error.message}`);
        }
    }
    async leaveRoom(roomId, client) {
        try {
            await this.pulsarService.closeoutConsumerForRoom(roomId);
            client.leave(roomId);
            this.logger.log(`Client ${client.id} left room ${roomId}`);
        }
        catch (error) {
            this.logger.error(`Failed to leave room: ${error.message}`);
        }
    }
    async getAllMessages(roomId) {
        try {
            const messages = await this.pulsarService.getMessagesByRoom(roomId);
            this.logger.log(`Fetched messages for room ${roomId}`);
            return messages;
        }
        catch (error) {
            this.logger.error(`Failed to fetch messages for room ${roomId}: ${error.message}`);
            throw error;
        }
    }
    async createMessage(message) {
        try {
            await this.sendMessageToProducer(message);
        }
        catch (error) {
            this.handleMessageFailure(error);
            throw error;
        }
    }
    async sendMessageToProducer(message) {
        try {
            const messageData = Buffer.from(JSON.stringify(message));
            const producerMessage = {
                data: messageData,
                partitionKey: message.room_id.toString(),
            };
            await this.pulsarProducer.send(producerMessage);
            this.logger.log(`Sent message to producer: ${JSON.stringify(message)}`);
        }
        catch (error) {
            this.logger.error(`Failed to send message to producer: ${error.message}`);
        }
    }
    handleMessageFailure(error) {
        this.logger.error(`Failed to handle message: ${error.message}`);
        throw new Error("Failed to handle message");
    }
};
exports.PicafeService = PicafeService;
exports.PicafeService = PicafeService = PicafeService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)("PULSAR")),
    __metadata("design:paramtypes", [pulsar_client_1.Producer,
        pulsar_service_1.PulsarService])
], PicafeService);
//# sourceMappingURL=picafe.service.js.map