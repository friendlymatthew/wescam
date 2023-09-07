"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoreModule = void 0;
const common_1 = require("@nestjs/common");
const julia_module_1 = require("./julia/modules/julia.module");
const prisma_module_1 = require("../database/prisma/prisma.module");
const holidayinn_module_1 = require("./julia/modules/holidayinn.module");
const entity_module_1 = require("./julia/modules/entity.module");
const picafe_module_1 = require("./picafe/modules/picafe.module");
let CoreModule = class CoreModule {
};
exports.CoreModule = CoreModule;
exports.CoreModule = CoreModule = __decorate([
    (0, common_1.Module)({
        imports: [
            julia_module_1.JuliaModule,
            prisma_module_1.PrismaModule,
            holidayinn_module_1.HolidayInnModule,
            entity_module_1.EntityModule,
            picafe_module_1.PicafeModule,
        ],
        providers: [],
        exports: [
            julia_module_1.JuliaModule,
            prisma_module_1.PrismaModule,
            holidayinn_module_1.HolidayInnModule,
            entity_module_1.EntityModule,
            picafe_module_1.PicafeModule,
        ],
    })
], CoreModule);
//# sourceMappingURL=core.module.js.map