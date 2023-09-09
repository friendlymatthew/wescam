"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PicafeModule = void 0;
const common_1 = require("@nestjs/common");
const picafe_service_1 = require("../service/picafe.service");
const picafe_gateway_1 = require("../gateway/picafe.gateway");
const scylla_module_1 = require("../../../database/scylla/scylla.module");
const pulsar_module_1 = require("./pulsar.module");
const pulsar_service_1 = require("../service/pulsar.service");
let PicafeModule = class PicafeModule {
};
exports.PicafeModule = PicafeModule;
exports.PicafeModule = PicafeModule = __decorate([
    (0, common_1.Module)({
        imports: [scylla_module_1.ScyllaModule, pulsar_module_1.PulsarModule],
        providers: [picafe_gateway_1.PicafeGateway, picafe_service_1.PicafeService, pulsar_service_1.PulsarService],
    })
], PicafeModule);
//# sourceMappingURL=picafe.module.js.map