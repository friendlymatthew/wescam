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
exports.HolidayInnResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const holidayinn_service_1 = require("../service/holidayinn.service");
const create_room_input_1 = require("../dto/create-room.input");
const common_1 = require("@nestjs/common");
const room_entity_1 = require("../entities/room.entity");
let HolidayInnResolver = class HolidayInnResolver {
    constructor(holidayInnService) {
        this.holidayInnService = holidayInnService;
    }
    async createOrUpdateRoom(createRoomInput) {
        const room = await this.holidayInnService.createOrUpdateRoom(createRoomInput);
        return room;
    }
    async getRoomById(id) {
        return await this.holidayInnService.getRoomsByUserId(id);
    }
};
exports.HolidayInnResolver = HolidayInnResolver;
__decorate([
    (0, graphql_1.Mutation)(() => room_entity_1.RoomEntityType),
    __param(0, (0, graphql_1.Args)("createRoomInput")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_room_input_1.CreateRoomInput]),
    __metadata("design:returntype", Promise)
], HolidayInnResolver.prototype, "createOrUpdateRoom", null);
__decorate([
    (0, common_1.Query)(() => [room_entity_1.RoomEntityType]),
    __param(0, (0, graphql_1.Args)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], HolidayInnResolver.prototype, "getRoomById", null);
exports.HolidayInnResolver = HolidayInnResolver = __decorate([
    (0, graphql_1.Resolver)(() => room_entity_1.RoomEntityType),
    __metadata("design:paramtypes", [holidayinn_service_1.HolidayInnService])
], HolidayInnResolver);
//# sourceMappingURL=holidayinn.resolvers.js.map