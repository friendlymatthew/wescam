"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RogueUsersModule = void 0;
const common_1 = require("@nestjs/common");
const rogue_users_service_1 = require("../rogue-users/rogue-users.service");
const rogue_users_controller_1 = require("../controllers/rogue-users.controller");
const prisma_service_1 = require("../../../database/prisma/prisma.service");
let RogueUsersModule = class RogueUsersModule {
};
exports.RogueUsersModule = RogueUsersModule;
exports.RogueUsersModule = RogueUsersModule = __decorate([
    (0, common_1.Module)({
        controllers: [rogue_users_controller_1.RogueUsersController],
        providers: [rogue_users_service_1.RogueUsersService, prisma_service_1.PrismaService],
        exports: [rogue_users_service_1.RogueUsersService],
    })
], RogueUsersModule);
//# sourceMappingURL=rogue-users.module.js.map