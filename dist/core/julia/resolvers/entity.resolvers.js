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
const user_entity_1 = require("../entities/user.entity");
const create_user_input_1 = require("../dto/create-user.input");
const rogue_user_entity_1 = require("../entities/rogue-user.entity");
const create_rogueuser_input_1 = require("../dto/create-rogueuser.input");
class EntityResolver {
    constructor(entityService) {
        this.entityService = entityService;
    }
    async createUser(createUserInput) {
        const user = await this.entityService.createUser(createUserInput);
        return user;
    }
    async createRogueUser(createRogueUserInput) {
        const rogueUser = await this.entityService.createRogueUser(createRogueUserInput);
        return rogueUser;
    }
}
exports.EntityResolver = EntityResolver;
__decorate([
    (0, graphql_1.Mutation)(() => user_entity_1.UserType),
    __param(0, (0, graphql_1.Args)("createUserInput")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_input_1.CreateUserInput]),
    __metadata("design:returntype", Promise)
], EntityResolver.prototype, "createUser", null);
__decorate([
    (0, graphql_1.Mutation)(() => rogue_user_entity_1.RogueUserType),
    __param(0, (0, graphql_1.Args)("createRogueUserInput")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_rogueuser_input_1.CreateRogueUserInput]),
    __metadata("design:returntype", Promise)
], EntityResolver.prototype, "createRogueUser", null);
//# sourceMappingURL=entity.resolvers.js.map