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
exports.EntityResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const entity_service_1 = require("../service/entity.service");
const user_entity_1 = require("../entities/user.entity");
const create_user_input_1 = require("../dto/create-user.input");
const rogue_user_entity_1 = require("../entities/rogue-user.entity");
const create_rogueuser_input_1 = require("../dto/create-rogueuser.input");
const graphql_2 = require("@nestjs/graphql");
let EntityResolver = class EntityResolver {
    constructor(entityService) {
        this.entityService = entityService;
    }
    async createUserMutation(createUserInput) {
        try {
            const user = await this.entityService.createUser(createUserInput);
            return user;
        }
        catch (error) {
            console.log(error);
            throw new Error("Failed to create user");
        }
    }
    async createRogueUserMutation(createRogueUserInput) {
        const rogueUser = await this.entityService.createRogueUser(createRogueUserInput);
        return rogueUser;
    }
    async getUserConfig(id) {
        try {
            const user = await this.entityService.getUserConfig(id);
            if (user) {
                return user;
            }
            else {
                throw new Error("Failed to get user");
            }
        }
        catch (error) {
            console.log(error);
            throw new Error("Failed to get user");
        }
    }
};
exports.EntityResolver = EntityResolver;
__decorate([
    (0, graphql_1.Mutation)(() => user_entity_1.UserType),
    __param(0, (0, graphql_1.Args)("createUserInput")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_input_1.CreateUserInput]),
    __metadata("design:returntype", Promise)
], EntityResolver.prototype, "createUserMutation", null);
__decorate([
    (0, graphql_1.Mutation)(() => rogue_user_entity_1.RogueUserType),
    __param(0, (0, graphql_1.Args)("createRogueUserInput")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_rogueuser_input_1.CreateRogueUserInput]),
    __metadata("design:returntype", Promise)
], EntityResolver.prototype, "createRogueUserMutation", null);
__decorate([
    (0, graphql_2.Query)(() => user_entity_1.UserType, { nullable: true }),
    __param(0, (0, graphql_1.Args)("id", { type: () => String })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EntityResolver.prototype, "getUserConfig", null);
exports.EntityResolver = EntityResolver = __decorate([
    (0, graphql_1.Resolver)(() => user_entity_1.UserType),
    __metadata("design:paramtypes", [entity_service_1.EntityService])
], EntityResolver);
//# sourceMappingURL=entity.resolvers.js.map