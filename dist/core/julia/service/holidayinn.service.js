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
Object.defineProperty(exports, "__esModule", { value: true });
exports.HolidayInnService = void 0;
const common_1 = require("@nestjs/common");
const julia_service_1 = require("./julia.service");
let HolidayInnService = class HolidayInnService {
    constructor(juliaService) {
        this.juliaService = juliaService;
    }
    async createOrUpdateRoom(input) {
        const prismaRoom = await this.juliaService.createOrUpdateRoom(input);
        return this.convertToRoomEntityType(prismaRoom);
    }
    async getRoomsByUserId(id) {
        const prismaRooms = await this.juliaService.getRoomsByUserId(id);
        return prismaRooms.map(this.convertToRoomEntityType);
    }
    convertToRoomEntityType(prismaRoom) {
        return {
            id: prismaRoom.id,
            creatorId: prismaRoom.creatorId,
            crushId: prismaRoom.crushId,
            creatorDisplayName: prismaRoom.creatorDisplayName,
            crushDisplayName: prismaRoom.crushDisplayName,
            roomType: prismaRoom.roomType,
            matchStatus: prismaRoom.matchStatus,
            createdAt: prismaRoom.createdAt.toISOString(),
            updatedAt: prismaRoom.updatedAt.toISOString(),
        };
    }
};
exports.HolidayInnService = HolidayInnService;
exports.HolidayInnService = HolidayInnService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [julia_service_1.JuliaService])
], HolidayInnService);
//# sourceMappingURL=holidayinn.service.js.map