"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HolidayInnModule = void 0;
const common_1 = require("@nestjs/common");
const holidayinn_resolvers_1 = require("../resolvers/holidayinn.resolvers");
const holidayinn_service_1 = require("../service/holidayinn.service");
let HolidayInnModule = class HolidayInnModule {
};
exports.HolidayInnModule = HolidayInnModule;
exports.HolidayInnModule = HolidayInnModule = __decorate([
    (0, common_1.Module)({
        providers: [holidayinn_resolvers_1.HolidayInnResolver, holidayinn_service_1.HolidayInnService],
    })
], HolidayInnModule);
//# sourceMappingURL=holidayinn.module.js.map