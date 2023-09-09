"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = {
    verbose: true,
    transform: {
        "^.+\\.tsx?$": "ts-jest",
    },
    moduleNameMapper: {
        "^src/(.*)$": "<rootDir>/src/$1",
    },
};
exports.default = config;
//# sourceMappingURL=jest.config.js.map