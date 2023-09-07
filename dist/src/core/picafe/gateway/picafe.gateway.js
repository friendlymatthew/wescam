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
const miguel_service_1 = require("../service/miguel.service");
const message_entities_1 = require("../entities/message.entities");
const socket_io_1 = require("socket.io");
const cassandra_driver_1 = require("cassandra-driver");
let PicafeGateway = class PicafeGateway {
    constructor(miguelService, picafeService) {
        this.miguelService = miguelService;
        this.picafeService = picafeService;
    }
    afterInit() {
        console.log("picafe gateway initalized");
    }
    handleConnection(client) {
        console.log("client connected: ", client.id);
    }
    async handleJoinRoom(client, roomId) {
        try {
            await this.miguelService.createConsumerForRoom(roomId.toString());
            client.join(roomId.toString());
            this.server
                .to(roomId.toString())
                .emit("user has joined", { userId: client.id, roomId });
        }
        catch (error) {
            client.emit("error", "Failed to join room : " + error.message);
        }
    }
    async handleLeaveRoom(client, roomId) {
        try {
            await this.miguelService.closeoutConsumerForRoom(roomId.toString());
            client.leave(roomId.toString());
            this.server
                .to(roomId.toString())
                .emit("user has left", { userId: client.id, roomId });
        }
        catch (error) {
            client.emit("error", "Failed to leave room : " + error.message);
        }
    }
    async handleSendMessage(message, client) {
        try {
            const roomId = message.room_id;
            await this.picafeService.createMessage(message);
            this.server.to(roomId.toString()).emit("newMessage", message);
        }
        catch (error) {
            client.emit("error", "Failed to send message : " + error.message);
        }
    }
    async handleFetchAllMessages(client, roomId) {
        try {
            const messages = await this.miguelService.getMessagesByRoom(roomId);
            client.emit("allMessages", messages);
        }
        catch (error) {
            client.emit("error", "Failed to fetch all messages : " + error.message);
        }
    }
};
exports.PicafeGateway = PicafeGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], PicafeGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)("joinRoom"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, cassandra_driver_1.types.Uuid]),
    __metadata("design:returntype", Promise)
], PicafeGateway.prototype, "handleJoinRoom", null);
__decorate([
    (0, websockets_1.SubscribeMessage)("leaveRoom"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, cassandra_driver_1.types.Uuid]),
    __metadata("design:returntype", Promise)
], PicafeGateway.prototype, "handleLeaveRoom", null);
__decorate([
    (0, websockets_1.SubscribeMessage)("sendMessage"),
    __param(0, (0, websockets_1.MessageBody)()),
    __param(1, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [message_entities_1.Message,
        socket_io_1.Socket]),
    __metadata("design:returntype", Promise)
], PicafeGateway.prototype, "handleSendMessage", null);
__decorate([
    (0, websockets_1.SubscribeMessage)("fetchAllMessages"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, cassandra_driver_1.types.Uuid]),
    __metadata("design:returntype", Promise)
], PicafeGateway.prototype, "handleFetchAllMessages", null);
exports.PicafeGateway = PicafeGateway = __decorate([
    (0, websockets_1.WebSocketGateway)(),
    __metadata("design:paramtypes", [miguel_service_1.MiguelService,
        picafe_service_1.PicafeService])
], PicafeGateway);
//# sourceMappingURL=picafe.gateway.js.map