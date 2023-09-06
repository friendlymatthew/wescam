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
exports.PicafeGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const picafe_service_1 = require("../service/picafe.service");
const message_entities_1 = require("../entities/message.entities");
const socket_io_1 = require("socket.io");
const cassandra_driver_1 = require("cassandra-driver");
let PicafeGateway = class PicafeGateway {
    constructor(picafeService) {
        this.picafeService = picafeService;
    }
    async createMessage(message, socket) {
        try {
            await this.picafeService.createMessage(message);
            socket.to("room123").emit("newMessage", message);
        }
        catch (error) {
            console.error(error);
        }
    }
    async getMessagesByRoom(roomIdString) {
        try {
            const roomGuid = cassandra_driver_1.types.Uuid.fromString(roomIdString);
            const messages = await this.picafeService.getMessagesByRoom(roomGuid);
            return messages;
        }
        catch (error) {
            console.error(error);
            return [];
        }
    }
};
exports.PicafeGateway = PicafeGateway;
__decorate([
    (0, websockets_1.SubscribeMessage)("createMessage"),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [message_entities_1.Message,
        socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], PicafeGateway.prototype, "createMessage", null);
__decorate([
    (0, websockets_1.SubscribeMessage)("getMessagesByRoom"),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PicafeGateway.prototype, "getMessagesByRoom", null);
exports.PicafeGateway = PicafeGateway = __decorate([
    (0, websockets_1.WebSocketGateway)(),
    __metadata("design:paramtypes", [picafe_service_1.PicafeService])
], PicafeGateway);
//# sourceMappingURL=picafe.gateway.js.map