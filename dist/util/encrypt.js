"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.compareSync = exports.encryptSync = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const encryptSync = (password) => {
    return bcrypt_1.default.hashSync(password, 3);
};
exports.encryptSync = encryptSync;
const compareSync = (password, hash) => {
    return bcrypt_1.default.compareSync(password, hash);
};
exports.compareSync = compareSync;
//# sourceMappingURL=encrypt.js.map