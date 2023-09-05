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
exports.CupidController = void 0;
const common_1 = require("@nestjs/common");
const cupid_service_1 = require("./cupid.service");
const create_cupid_dto_1 = require("./dto/create-cupid.dto");
const update_cupid_dto_1 = require("./dto/update-cupid.dto");
let CupidController = class CupidController {
    constructor(cupidService) {
        this.cupidService = cupidService;
    }
    create(createCupidDto) {
        return this.cupidService.create(createCupidDto);
    }
    findAll() {
        return this.cupidService.findAll();
    }
    findOne(id) {
        return this.cupidService.findOne(+id);
    }
    update(id, updateCupidDto) {
        return this.cupidService.update(+id, updateCupidDto);
    }
    remove(id) {
        return this.cupidService.remove(+id);
    }
};
exports.CupidController = CupidController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_cupid_dto_1.CreateCupidDto]),
    __metadata("design:returntype", void 0)
], CupidController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CupidController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CupidController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_cupid_dto_1.UpdateCupidDto]),
    __metadata("design:returntype", void 0)
], CupidController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CupidController.prototype, "remove", null);
exports.CupidController = CupidController = __decorate([
    (0, common_1.Controller)('cupid'),
    __metadata("design:paramtypes", [cupid_service_1.CupidService])
], CupidController);
//# sourceMappingURL=cupid.controller.js.map