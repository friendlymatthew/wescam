"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorResponseWrapper = void 0;
const response_wrapper_model_1 = require("./response-wrapper.model");
class ErrorResponseWrapper extends response_wrapper_model_1.ResponseWrapper {
    constructor(message, data, success = false) {
        super(message, data, success);
        this.message = message;
        this.data = data;
        this.success = success;
    }
}
exports.ErrorResponseWrapper = ErrorResponseWrapper;
//# sourceMappingURL=error-response-wrapper.model.js.map