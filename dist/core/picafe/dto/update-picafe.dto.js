"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePicafeDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_picafe_dto_1 = require("./create-picafe.dto");
class UpdatePicafeDto extends (0, mapped_types_1.PartialType)(create_picafe_dto_1.CreatePicafeDto) {
}
exports.UpdatePicafeDto = UpdatePicafeDto;
//# sourceMappingURL=update-picafe.dto.js.map