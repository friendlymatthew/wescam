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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../database/prisma/prisma.service");
const response_wrapper_model_1 = require("../../wrappers/response-wrapper.model");
const error_response_wrapper_model_1 = require("../../wrappers/error-response-wrapper.model");
const rogue_users_service_1 = require("../rogue-users/rogue-users.service");
let UsersService = class UsersService {
    constructor(prisma, rogueUsersService) {
        this.prisma = prisma;
        this.rogueUsersService = rogueUsersService;
    }
    async createUser(createUserDto) {
        try {
            const { name, email, pronoun, classYear } = createUserDto;
            const newUser = {
                name,
                email,
                pronoun,
                classYear,
            };
            const rogueResponse = await this.rogueUsersService.isRogueUser(email);
            if (rogueResponse.success) {
                newUser.id = rogueResponse.data;
                await this.rogueUsersService.removeRogueUser(email);
            }
            const createdUser = await this.prisma.user.create({
                data: newUser,
            });
            return new response_wrapper_model_1.ResponseWrapper('User created', createdUser, true);
        }
        catch (error) {
            return new error_response_wrapper_model_1.ErrorResponseWrapper('User not created', error, false);
        }
    }
    async getUser(id) {
        const user = await this.prisma.user.findUnique({ where: { id } });
        if (!user) {
            throw new common_1.NotFoundException(`User with id ${id} not found`);
        }
        return user;
    }
    async getAllUsers() {
        return await this.prisma.user.findMany();
    }
    async updateUser(id, updateUserDto) {
        const user = await this.getUser(id);
        const updatedUser = {
            ...updateUserDto,
        };
        return await this.prisma.user.update({
            where: { id: user.id },
            data: updatedUser,
        });
    }
    async deleteUser(id) {
        const user = await this.getUser(id);
        await this.prisma.user.delete({
            where: { id: user.id },
        });
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        rogue_users_service_1.RogueUsersService])
], UsersService);
//# sourceMappingURL=users.service.js.map