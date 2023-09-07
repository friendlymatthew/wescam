"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MiguelModule = void 0;
const common_1 = require("@nestjs/common");
const pulsar_client_1 = require("pulsar-client");
const miguel_service_1 = require("../service/miguel.service");
const miguel = new pulsar_client_1.Client({
    serviceUrl: "pulsar://localhost:6650",
});
let MiguelModule = class MiguelModule {
};
exports.MiguelModule = MiguelModule;
exports.MiguelModule = MiguelModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        providers: [
            {
                provide: "MIGUEL",
                useValue: miguel,
            },
            miguel_service_1.MiguelService,
        ],
        exports: ["MIGUEL", miguel_service_1.MiguelService],
    })
], MiguelModule);
//# sourceMappingURL=miguel.module.js.map