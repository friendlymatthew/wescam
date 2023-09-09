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
let PicafeService = PicafeService_1 = class PicafeService {
    constructor(pulsarProducer) {
        this.pulsarProducer = pulsarProducer;
        this.logger = new common_1.Logger(PicafeService_1.name);
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
    __metadata("design:paramtypes", [pulsar_client_1.Producer])
], PicafeService);
//# sourceMappingURL=picafe.service.js.map