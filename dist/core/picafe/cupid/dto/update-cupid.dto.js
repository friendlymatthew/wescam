"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateCupidDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_cupid_dto_1 = require("./create-cupid.dto");
class UpdateCupidDto extends (0, mapped_types_1.PartialType)(create_cupid_dto_1.CreateCupidDto) {
}
exports.UpdateCupidDto = UpdateCupidDto;
//# sourceMappingURL=update-cupid.dto.js.map