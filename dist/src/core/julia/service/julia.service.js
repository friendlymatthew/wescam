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
exports.JuliaService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const prisma_service_1 = require("../../../database/prisma/prisma.service");
let JuliaService = class JuliaService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createUser(input) {
        const { name, email, pronouns, classYear } = input;
        const rogueCheckRes = await this.isRogueUser(email);
        const userData = {
            id: rogueCheckRes.id,
            name,
            email,
            pronouns,
            classYear,
        };
        const user = await this.prisma.user.create({
            data: userData,
        });
        if (rogueCheckRes.isEntity && rogueCheckRes.id) {
            await this.deleteRogueUser(rogueCheckRes.id);
        }
        return user;
    }
    async createRogueUser(input) {
        const { email } = input;
        const rogueUser = await this.prisma.rogueUser.create({
            data: {
                email,
            },
        });
        return rogueUser;
    }
    async createOrUpdateRoom(input) {
        const { creatorId, crushId, creatorDisplayName, crushDisplayName } = input;
        const userCrushCheckRes = await this.isUser(crushId);
        if (userCrushCheckRes.isEntity && userCrushCheckRes.id) {
            const existingRoom = await this.findExistingRoom(creatorId, crushId);
            if (existingRoom) {
                return this.prisma.room.update({
                    where: { id: existingRoom.id },
                    data: { matchStatus: client_1.MatchStatus.MATCH },
                });
            }
            return this.prisma.room.create({
                data: {
                    creatorId,
                    crushId,
                    creatorDisplayName,
                    crushDisplayName,
                    roomType: client_1.RoomType.LIVE,
                    matchStatus: client_1.MatchStatus.GUESS,
                },
            });
        }
        else {
            const rogueCrushCheckRes = await this.isRogueUser(crushId);
            if (rogueCrushCheckRes.isEntity) {
                return this.prisma.room.create({
                    data: {
                        creatorId,
                        crushId,
                        creatorDisplayName,
                        crushDisplayName,
                        roomType: client_1.RoomType.DORMANT,
                        matchStatus: client_1.MatchStatus.GUESS,
                    },
                });
            }
            const rogueUser = await this.createRogueUser({
                email: crushId,
            });
            return this.prisma.room.create({
                data: {
                    creatorId,
                    crushId: rogueUser.id,
                    creatorDisplayName,
                    crushDisplayName,
                    roomType: client_1.RoomType.DORMANT,
                    matchStatus: client_1.MatchStatus.GUESS,
                },
            });
        }
    }
    async getUserConfig(input) {
        return this.prisma.user.findFirst({
            where: {
                id: input,
            },
        });
    }
    async getRoomsByUserId(userId) {
        return this.prisma.room.findMany({
            where: {
                AND: [
                    {
                        OR: [
                            {
                                creatorId: userId,
                            },
                            {
                                crushId: userId,
                            },
                        ],
                    },
                    {
                        roomType: client_1.RoomType.LIVE,
                    },
                ],
            },
        });
    }
    async findExistingRoom(creatorId, crushId) {
        return this.prisma.room.findFirst({
            where: {
                creatorId: {
                    in: [creatorId, crushId],
                },
                crushId: {
                    in: [creatorId, crushId],
                },
                roomType: client_1.RoomType.LIVE,
            },
        });
    }
    async deleteRogueUser(rogueId) {
        await this.prisma.rogueUser.delete({
            where: {
                id: rogueId,
            },
        });
    }
    async isUser(id) {
        const user = await this.prisma.user.findUnique({
            where: {
                id,
            },
        });
        return {
            isEntity: !!user,
            id: user?.id,
        };
    }
    async isRogueUser(email) {
        const rogueUser = await this.prisma.rogueUser.findUnique({
            where: {
                email,
            },
        });
        return {
            isEntity: !!rogueUser,
            id: rogueUser?.id,
        };
    }
};
exports.JuliaService = JuliaService;
exports.JuliaService = JuliaService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], JuliaService);
//# sourceMappingURL=julia.service.js.map