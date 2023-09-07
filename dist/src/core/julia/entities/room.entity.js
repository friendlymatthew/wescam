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
exports.RoomEntityType = void 0;
const graphql_1 = require("@nestjs/graphql");
const client_1 = require("@prisma/client");
(0, graphql_1.registerEnumType)(client_1.RoomType, { name: "RoomType" });
(0, graphql_1.registerEnumType)(client_1.MatchStatus, { name: "MatchStatus" });
let RoomEntityType = class RoomEntityType {
};
exports.RoomEntityType = RoomEntityType;
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], RoomEntityType.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], RoomEntityType.prototype, "creatorId", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], RoomEntityType.prototype, "crushId", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], RoomEntityType.prototype, "creatorDisplayName", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], RoomEntityType.prototype, "crushDisplayName", void 0);
__decorate([
    (0, graphql_1.Field)(() => client_1.RoomType),
    __metadata("design:type", String)
], RoomEntityType.prototype, "roomType", void 0);
__decorate([
    (0, graphql_1.Field)(() => client_1.MatchStatus),
    __metadata("design:type", String)
], RoomEntityType.prototype, "matchStatus", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], RoomEntityType.prototype, "createdAt", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], RoomEntityType.prototype, "updatedAt", void 0);
exports.RoomEntityType = RoomEntityType = __decorate([
    (0, graphql_1.ObjectType)()
], RoomEntityType);
//# sourceMappingURL=room.entity.js.map