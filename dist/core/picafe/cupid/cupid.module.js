"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CupidModule = void 0;
const common_1 = require("@nestjs/common");
const cupid_service_1 = require("./cupid.service");
const cupid_controller_1 = require("./cupid.controller");
let CupidModule = class CupidModule {
};
exports.CupidModule = CupidModule;
exports.CupidModule = CupidModule = __decorate([
    (0, common_1.Module)({
        controllers: [cupid_controller_1.CupidController],
        providers: [cupid_service_1.CupidService],
    })
], CupidModule);
//# sourceMappingURL=cupid.module.js.map