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
exports.RogueUsersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../database/prisma/prisma.service");
const response_wrapper_model_1 = require("../../wrappers/response-wrapper.model");
const error_response_wrapper_model_1 = require("../../wrappers/error-response-wrapper.model");
let RogueUsersService = class RogueUsersService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createRogueUser(createRogueUserDto) {
        const { email } = createRogueUserDto;
        if (await this.isRogueUser(email)) {
            return;
        }
        const newRogueUser = {
            email,
        };
        return await this.prisma.rogueUser.create({
            data: newRogueUser,
        });
    }
    async isRogueUser(email) {
        const rogueUser = await this.prisma.rogueUser.findUnique({
            where: { email },
        });
        if (!rogueUser) {
            return new error_response_wrapper_model_1.ErrorResponseWrapper('User not found', '', false);
        }
        return new response_wrapper_model_1.ResponseWrapper('Rogue user found', rogueUser.id, true);
    }
    async removeRogueUser(email) {
        const rogueUser = await this.prisma.rogueUser.findUnique({
            where: { email },
        });
        if (!rogueUser) {
            throw new common_1.NotFoundException(`Rogue User with email ${email} not found`);
        }
        await this.prisma.rogueUser.delete({
            where: { email },
        });
    }
};
exports.RogueUsersService = RogueUsersService;
exports.RogueUsersService = RogueUsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], RogueUsersService);
//# sourceMappingURL=rogue-users.service.js.map