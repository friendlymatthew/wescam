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
const picafe_service_1 = require("./picafe.service");
const create_picafe_dto_1 = require("./dto/create-picafe.dto");
const update_picafe_dto_1 = require("./dto/update-picafe.dto");
let PicafeGateway = class PicafeGateway {
    constructor(picafeService) {
        this.picafeService = picafeService;
        this.clients = new Map();
    }
    handleConnection(client, ...args) {
        this.clients.set(client.id, client);
    }
    handleDisconnect(client) {
        this.clients.delete(client.id);
    }
    create(createPicafeDto) {
        return this.picafeService.create(createPicafeDto);
    }
    findAll() {
        return this.picafeService.findAll();
    }
    findOne(id) {
        return this.picafeService.findOne(id);
    }
    update(updatePicafeDto) {
        return this.picafeService.update(updatePicafeDto.id, updatePicafeDto);
    }
    remove(id) {
        return this.picafeService.remove(id);
    }
};
exports.PicafeGateway = PicafeGateway;
__decorate([
    (0, websockets_1.SubscribeMessage)('createPicafe'),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_picafe_dto_1.CreatePicafeDto]),
    __metadata("design:returntype", void 0)
], PicafeGateway.prototype, "create", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('findAllPicafe'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PicafeGateway.prototype, "findAll", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('findOnePicafe'),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], PicafeGateway.prototype, "findOne", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('updatePicafe'),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_picafe_dto_1.UpdatePicafeDto]),
    __metadata("design:returntype", void 0)
], PicafeGateway.prototype, "update", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('removePicafe'),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], PicafeGateway.prototype, "remove", null);
exports.PicafeGateway = PicafeGateway = __decorate([
    (0, websockets_1.WebSocketGateway)(),
    __metadata("design:paramtypes", [picafe_service_1.PicafeService])
], PicafeGateway);
//# sourceMappingURL=picafe.gateway.js.map