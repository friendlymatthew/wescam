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
var ZookeeperService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZookeeperService = void 0;
const common_1 = require("@nestjs/common");
const node_zookeeper_client_1 = require("node-zookeeper-client");
let ZookeeperService = ZookeeperService_1 = class ZookeeperService {
    constructor() {
        this.logger = new common_1.Logger(ZookeeperService_1.name);
        this.client = node_zookeeper_client_1.default.createClient("localhost:2181");
    }
    async onModuleInit() {
        this.connectToZookeeper();
    }
    async onModuleDestroy() {
        this.client.close();
    }
    connectToZookeeper() {
        this.client.once("connected", () => {
            this.logger.log("Connected to Zookeeper");
        });
    }
};
exports.ZookeeperService = ZookeeperService;
exports.ZookeeperService = ZookeeperService = ZookeeperService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], ZookeeperService);
//# sourceMappingURL=zookeeper.service.js.map