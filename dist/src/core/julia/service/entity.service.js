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
exports.EntityService = void 0;
const common_1 = require("@nestjs/common");
const julia_service_1 = require("./julia.service");
let EntityService = class EntityService {
    constructor(juliaService) {
        this.juliaService = juliaService;
    }
    async createUser(input) {
        return this.juliaService.createUser(input);
    }
    async createRogueUser(input) {
        return this.juliaService.createRogueUser(input);
    }
    async getUserConfig(input) {
        return this.juliaService.getUserConfig(input);
    }
};
exports.EntityService = EntityService;
exports.EntityService = EntityService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [julia_service_1.JuliaService])
], EntityService);
//# sourceMappingURL=entity.service.js.map