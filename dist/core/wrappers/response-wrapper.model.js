"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseWrapper = void 0;
class ResponseWrapper {
    constructor(message, data, success = true) {
        this.message = message;
        this.data = data;
        this.success = success;
    }
}
exports.ResponseWrapper = ResponseWrapper;
//# sourceMappingURL=response-wrapper.model.js.map