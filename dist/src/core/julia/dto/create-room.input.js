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
exports.CreateRoomInput = void 0;
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
let CreateRoomInput = class CreateRoomInput {
};
exports.CreateRoomInput = CreateRoomInput;
__decorate([
    (0, graphql_1.Field)(() => String, { description: "creator id" }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateRoomInput.prototype, "creatorId", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { description: "crush id" }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateRoomInput.prototype, "crushId", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { description: "creator display name" }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateRoomInput.prototype, "creatorDisplayName", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { description: "crush display name" }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateRoomInput.prototype, "crushDisplayName", void 0);
exports.CreateRoomInput = CreateRoomInput = __decorate([
    (0, graphql_1.InputType)()
], CreateRoomInput);
//# sourceMappingURL=create-room.input.js.map