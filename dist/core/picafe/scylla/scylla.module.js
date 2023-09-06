"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScyllaModule = void 0;
const common_1 = require("@nestjs/common");
const cassandra_driver_1 = require("cassandra-driver");
const contactPoints = ["127.0.0.1:9042"];
const keyspace = "picafe_chat";
const clientOptions = {
    contactPoints,
    localDataCenter: "wesleyan",
    keyspace,
};
const client = new cassandra_driver_1.Client(clientOptions);
let ScyllaModule = class ScyllaModule {
};
exports.ScyllaModule = ScyllaModule;
exports.ScyllaModule = ScyllaModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        providers: [
            {
                provide: "SCYLLA_CLIENT",
                useValue: client,
            },
        ],
        exports: ["SCYLLA_CLIENT"],
    })
], ScyllaModule);
//# sourceMappingURL=scylla.module.js.map