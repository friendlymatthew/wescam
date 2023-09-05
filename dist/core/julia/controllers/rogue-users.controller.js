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
exports.RogueUsersController = void 0;
const common_1 = require("@nestjs/common");
const create_rogue_user_dto_1 = require("../dto/create-rogue-user.dto");
const rogue_users_service_1 = require("../rogue-users/rogue-users.service");
let RogueUsersController = class RogueUsersController {
    constructor(rogueUsersService) {
        this.rogueUsersService = rogueUsersService;
    }
    createRogueUser(createRogueUserDto) {
        return this.rogueUsersService.createRogueUser(createRogueUserDto);
    }
    isRogueUser(email) {
        return this.rogueUsersService.isRogueUser(email);
    }
    removeRogueUser(email) {
        return this.rogueUsersService.removeRogueUser(email);
    }
};
exports.RogueUsersController = RogueUsersController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_rogue_user_dto_1.CreateRogueUserDto]),
    __metadata("design:returntype", void 0)
], RogueUsersController.prototype, "createRogueUser", null);
__decorate([
    (0, common_1.Get)(':email'),
    __param(0, (0, common_1.Param)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RogueUsersController.prototype, "isRogueUser", null);
__decorate([
    (0, common_1.Delete)(':email'),
    __param(0, (0, common_1.Param)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RogueUsersController.prototype, "removeRogueUser", null);
exports.RogueUsersController = RogueUsersController = __decorate([
    (0, common_1.Controller)('rogue-users'),
    __metadata("design:paramtypes", [rogue_users_service_1.RogueUsersService])
], RogueUsersController);
//# sourceMappingURL=rogue-users.controller.js.map